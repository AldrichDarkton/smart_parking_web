import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { handleLogin } from "../services/api/parkingFormService";
import Toast from "../components/Toast";
import { useNotiStore } from "../store/notiStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { setNoti } = useNotiStore.getState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and authorization token.");
      return;
    }

    const response = await handleLogin(username.trim(), password);

    if (response.isSuccess) {
      setNoti("success", `Welcome back ${username}!`);
      navigate("/dashboard");
    } else {
      setError(
        response.body.message || "Authentication failed. Please try again.",
      );
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:flex-row"
      >
        {/* Branding panel */}
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-primary p-7 text-primary-content sm:p-9 md:min-h-[420px] md:w-[46%]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5" />

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative z-10 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10">
              <ShieldCheck className="h-7 w-7" strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                Secure Access
              </p>
              <p className="text-sm font-bold">Smart Car Park</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 mt-8 md:mt-0"
          >
            <h1 className="max-w-xs text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Smart
              <br />
              Parking Manager
            </h1>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              Secure gateway for parking administrators and operations
              personnel. Sign in to access your real-time parking management
              dashboard.
            </p>
          </motion.div>

          <div className="relative z-10 mt-8 border-t border-white/20 pt-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
              Smart Sensing for Seamless Parking
            </p>
          </div>
        </div>

        {/* Login form panel */}
        <div className="flex flex-1 flex-col justify-center p-7 sm:p-10 md:p-11">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <div className="mb-7">
              <span className="badge badge-primary badge-outline mb-3">
                ADMIN PORTAL
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-base-content">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-base-content/60">
                Enter your credentials to access the system.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username */}
              <fieldset className="fieldset gap-1">
                <legend className="fieldset-legend text-sm font-semibold">
                  Operator ID / Username
                </legend>

                <label className="input input-bordered focus-within:input-primary flex w-full items-center gap-3">
                  <UserRound className="h-4 w-4 shrink-0 text-primary/70" />

                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Enter your username"
                    className="grow"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </fieldset>

              {/* Password / authorization token */}
              <fieldset className="fieldset gap-1">
                <legend className="fieldset-legend text-sm font-semibold">
                  Authorization Token
                </legend>

                <label className="input input-bordered focus-within:input-primary flex w-full items-center gap-3">
                  <LockKeyhole className="h-4 w-4 shrink-0 text-primary/70" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your authorization token"
                    className="grow min-w-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="btn btn-ghost btn-xs btn-square"
                    aria-label={showPassword ? "Hide token" : "Show token"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </label>
              </fieldset>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="alert alert-error py-3 text-sm"
                >
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary mt-1 w-full shadow-md"
              >
                Authenticate &amp; Enter
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary/60" />
              <p className="text-center text-[9px] font-medium uppercase tracking-[0.12em] text-base-content/45">
                Authorized personnel only · Secure session
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <Toast />
    </main>
  );
}
