import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gxncsdqydmdcoetexjmo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bmNzZHF5ZG1kY29ldGV4am1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNTEyNDMsImV4cCI6MjAwNjgyNzI0M30.41UEzb1UDax2g-32d6hYBktGcRIJ2PjyZ1qW28svNs8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;