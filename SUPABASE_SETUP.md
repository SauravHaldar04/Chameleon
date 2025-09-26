# Supabase Integration Setup Guide

## 🚀 **Setup Instructions**

### 1. **Create Supabase Project**
1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and create a project
4. Wait for the project to be set up

### 2. **Get API Keys**
1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. **Update Environment Variables**
1. Open `.env` file in your project root
2. Replace the placeholder values:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. **Set up Database**
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the entire content from `supabase-setup.sql`
3. Click "Run" to execute the SQL

### 5. **Configure Authentication**
1. Go to Authentication → Settings
2. **Site URL**: Add your development URL (e.g., `http://localhost:3001`)
3. **Redirect URLs**: Add the same URL
4. **Email Auth**: Ensure it's enabled (default)

## 📋 **What's Included**

### **Database Schema**
- ✅ `profiles` table with user data
- ✅ Row Level Security (RLS) policies
- ✅ Automatic profile creation on signup
- ✅ Updated timestamp triggers

### **Authentication Features**
- ✅ Email/Password signup and signin
- ✅ Automatic profile creation
- ✅ Role-based authentication (Brand/Publisher)
- ✅ Session management
- ✅ User profile updates

### **TypeScript Integration**
- ✅ Full type safety with TypeScript interfaces
- ✅ Supabase client configuration
- ✅ Error handling

## 🧪 **Testing the Integration**

### **Test Signup Flow**
1. Start your development server: `npm start`
2. Go to `/auth/signup`
3. Fill out the form with different roles
4. Check Supabase Dashboard → Authentication → Users
5. Check the `profiles` table data

### **Test Login Flow**
1. Go to `/auth/login`
2. Use the credentials from signup
3. Verify dashboard switching works
4. Check user session persistence

### **Verify Database**
1. Go to Supabase Dashboard → Table Editor
2. Check `profiles` table has your user data
3. Verify RLS policies are working (users only see their own data)

## 🔐 **Security Notes**

### **Environment Variables**
- ✅ `.env` added to `.gitignore`
- ✅ Never commit API keys to version control
- ✅ Use environment-specific keys for production

### **Row Level Security**
- ✅ Users can only access their own profile data
- ✅ Automatic profile creation with proper permissions
- ✅ Secure API access patterns

## 🚨 **Troubleshooting**

### **Common Issues**
1. **"Missing environment variables"**: Check `.env` file exists and has correct keys
2. **"Failed to fetch user profile"**: Run the SQL migration in Supabase
3. **Authentication not working**: Verify Site URL in Supabase settings
4. **CORS errors**: Make sure your domain is in Redirect URLs

### **Quick Fixes**
- Restart dev server after updating `.env`
- Clear browser cache/localStorage if having session issues
- Check Supabase Dashboard logs for detailed error messages

## 🎯 **Next Steps**
- Test both Brand and Publisher signup flows
- Verify dashboard switching works with real authentication
- Add password reset functionality if needed
- Set up email templates in Supabase for better user experience

Your authentication system is now fully integrated with Supabase! 🎉
