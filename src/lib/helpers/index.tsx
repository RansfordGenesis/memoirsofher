import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://ydwvzozpcuzqeudrhwnx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkd3Z6b3pwY3V6cWV1ZHJod254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzg5OTYsImV4cCI6MjA1MDIxNDk5Nn0.-n3pTStRyG37yUUrqzjwNOGoeoAG31CMKKcbqnrqeHY')
