const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://gjrmymqrutttttklunnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqcm15bXFydXR0dHR0a2x1bm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMTI1MDcsImV4cCI6MTk5ODU4ODUwN30.EDCnAulkTpNJDAqrk7dZV2mB_AL885DJah6uAxlcB9Q';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase