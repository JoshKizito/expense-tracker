import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import PasswordInput from "@/components/PasswordInput";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const registerFormSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary-500 transition-colors";
const fieldVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.25 },
  }),
};

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerFormSchema) });

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    try {
      await registerUser(values);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "Une erreur est survenue";
      setServerError(message);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="flex justify-end px-5 pt-5">
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm"
        >
          <motion.h1
            custom={0}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-1"
          >
            Créer un compte 🚀
          </motion.h1>
          <motion.p
            custom={1}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-gray-400 dark:text-gray-500 mb-8"
          >
            Commence à suivre tes finances en 30 secondes
          </motion.p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                Nom
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className={inputClass}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </motion.div>

            <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="exemple@gmail.com"
                {...register("email")}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                Mot de passe
              </label>
              <PasswordInput
                id="password"
                placeholder="8 caractères minimum"
                {...register("password")}
                className={inputClass}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </motion.div>

            {serverError && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm text-red-500"
              >
                {serverError}
              </motion.p>
            )}

            <motion.button
              custom={5}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Création..." : "Créer mon compte"}
            </motion.button>
          </form>

          <motion.p
            custom={6}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-gray-400 dark:text-gray-500 mt-6 text-center"
          >
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              Se connecter
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
