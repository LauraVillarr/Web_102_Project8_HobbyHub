import { createClient } from '@supabase/supabase-js'

const URL = 'https://pldfsedigeqytlqwlsrf.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZGZzZWRpZ2VxeXRscXdsc3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4Njc5MzYsImV4cCI6MTk5NzQ0MzkzNn0.g9p6gi7l9vY8MTGcReuSlLcKxSyCZi0yUa6vPTnPTCw';
export const supabase = createClient(URL, API_KEY);