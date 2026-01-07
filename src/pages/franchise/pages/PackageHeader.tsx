import { motion } from "framer-motion";

export const PackageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
      Listing Packages
    </h1>
    <p className="text-muted-foreground text-lg">
      Choose the perfect package to list your cars
    </p>
  </motion.div>
);