import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Schema, Document } from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/workshop";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  phone:     { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Enquiry = mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
// ─────────────────────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: ["http://localhost:5173", "https://workshop-landing-page-eight.vercel.app"], credentials: true }));
app.use(express.json());

// ── Validation helpers ────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian 10-digit mobile number

interface EnquiryBody {
  name?: string;
  email?: string;
  phone?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

function validateEnquiry(body: EnquiryBody): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body.name || body.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  }

  if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  if (!body.phone || !PHONE_REGEX.test(body.phone.trim())) {
    errors.push({ field: "phone", message: "Please enter a valid 10-digit Indian mobile number." });
  }

  return errors;
}

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// POST /api/enquiry
app.post("/api/enquiry", async (req: Request, res: Response) => {
  const body = req.body as EnquiryBody;

  // Server-side validation
  const errors = validateEnquiry(body);
  if (errors.length > 0) {
    res.status(422).json({ success: false, errors });
    return;
  }

  const sanitised = {
    name:  body.name!.trim(),
    email: body.email!.trim().toLowerCase(),
    phone: body.phone!.trim(),
  };

  try {
    const enquiry = new Enquiry(sanitised);
    await enquiry.save();
  } catch (err) {
    console.error("DB save error:", err);
    res.status(500).json({ success: false, message: "Database error. Please try again." });
    return;
  }

  console.log("📩 New enquiry received:", sanitised);

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully!",
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
