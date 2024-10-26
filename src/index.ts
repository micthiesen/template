import { serve } from "./api/app.js";
import { schedule } from "./jobs/cron.js";

serve(); // Start the API server
schedule(); // Start the cron job
