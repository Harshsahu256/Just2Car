
// import React, { useState, useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Camera, 
//   Save, 
//   Lock, 
//   Trash2, 
//   AlertTriangle,
//   Loader2,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   Calendar,
//   Edit3,
//   X,
//   XCircle
// } from 'lucide-react';

// // ✅ IMPORT API SERVICES
// import { 
//   getUserProfile, 
//   updateUserProfile, 
//   changeUserPassword, 
//   deleteUserProfile 
// } from '@/services/franchiseService';

// // Types
// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
//   permissions: string[];
//   country: string;
//   state: string;
//   city: string;
//   pincode: string;
//   profileImage: string | null;
//   createdAt: string;
// }

// interface PasswordForm {
//   currentPassword: string;
//   newPassword: string;
//   confirmNewPassword: string;
// }

// // Role badge color mapping
// const roleBadgeStyles: Record<string, string> = {
//   user: 'bg-secondary text-secondary-foreground',
//   admin: 'bg-primary text-primary-foreground',
//   franchise: 'bg-accent text-accent-foreground',
//   dealer: 'bg-warning text-warning-foreground',
//   subadmin: 'bg-success text-success-foreground',
// };

// const Profile: React.FC = () => {
//   // State management
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [accountDeleted, setAccountDeleted] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null); // Added for API upload
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Password visibility toggles
//   const [showcurrentPassword, setShowcurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form states
//   const [editForm, setEditForm] = useState({
//     fullName: '',
//     phone: '',
//     country: '',
//     state: '',
//     city: '',
//     pincode: '',
//   });

//   const [passwordForm, setPasswordForm] = useState<PasswordForm>({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Fetch profile on mount
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // ✅ API: Fetch Profile Logic
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getUserProfile();
//       const data: UserProfile = res.data || res;

//       setProfile(data);
//       setEditForm({
//         fullName: data.fullName || '',
//         phone: data.phone || '',
//         country: data.country || '',
//         state: data.state || '',
//         city: data.city || '',
//         pincode: data.pincode || '',
//       });
//       setImagePreview(data.profileImage || null);
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || 'Failed to load profile');
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle profile image selection
//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setSelectedImage(file); // Set file for API
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//         // toast.success('Image selected');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle entering edit mode
//   const handleStartEdit = () => {
//     if (profile) {
//       setEditForm({
//         fullName: profile.fullName || '',
//         phone: profile.phone || '',
//         country: profile.country || '',
//         state: profile.state || '',
//         city: profile.city || '',
//         pincode: profile.pincode || '',
//       });
//     }
//     setIsEditing(true);
//   };

//   // Handle canceling edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setImagePreview(profile?.profileImage || null);
//     setSelectedImage(null);
//   };

//   // ✅ API: Update Profile Logic
//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       setSaving(true);
      
//       const formData = new FormData();
//       formData.append('fullName', editForm.fullName);
//       formData.append('phone', editForm.phone);
//       formData.append('country', editForm.country);
//       formData.append('state', editForm.state);
//       formData.append('city', editForm.city);
//       formData.append('pincode', editForm.pincode);
      
//       if (selectedImage) {
//         formData.append('profileImage', selectedImage);
//       }

//       const res = await updateUserProfile(formData);
//       const updatedProfile = res.data || res;

//       setProfile(updatedProfile);
//       setSelectedImage(null);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ API: Password Change Logic
//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }

//     if (passwordForm.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     if (!passwordForm.currentPassword) {
//       toast.error('Please enter your current password');
//       return;
//     }

//     try {
//       setChangingPassword(true);

//       await changeUserPassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       });

//       toast.success('Password changed successfully!');
//       setPasswordForm({
//         currentPassword: '',
//         newPassword: '',
//         confirmNewPassword: '',
//       });
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || 'Failed to change password');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   // ✅ API: Delete Account Logic
//   const handleDeleteAccount = async () => {
//     try {
//       setDeleting(true);

//       await deleteUserProfile();

//       setAccountDeleted(true);
//       setShowDeleteModal(false);
//       toast.success('Account deleted successfully');
      
//       // Optional: Redirect to login/home after a delay
//       setTimeout(() => {
//         window.location.href = '/'; 
//       }, 2000);
      
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || 'Failed to delete account');
//       setDeleting(false);
//       setShowDeleteModal(false);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="glass-card animate-fade-in flex flex-col items-center gap-4 p-8">
//           <Loader2 className="w-12 h-12 text-primary animate-spin" />
//           <p className="text-muted-foreground">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !profile) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="glass-card animate-fade-in max-w-md w-full text-center p-8">
//           <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Profile</h2>
//           <p className="text-muted-foreground mb-6">{error}</p>
//           <button
//             onClick={fetchProfile}
//             className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Account deleted state
//   if (accountDeleted) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="glass-card animate-scale-in max-w-md w-full text-center p-8">
//           <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Trash2 className="w-10 h-10 text-destructive" />
//           </div>
//           <h2 className="text-2xl font-bold text-foreground mb-3">Account Deleted</h2>
//           <p className="text-muted-foreground">
//             Your account has been permanently deleted. We're sorry to see you go.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Background decoration */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
//         {/* Header */}
//         <div className="animate-fade-in mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
//           <p className="text-muted-foreground">Manage your account settings and preferences</p>
//         </div>

//         {/* Profile Section - View/Edit Toggle */}
//         <section className="glass-card animate-slide-up mb-6 overflow-hidden" style={{ animationDelay: '0.1s' }}>
//           {/* Section Header */}
//           <div className="flex items-center justify-between p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <User className="w-5 h-5 text-primary" />
//               Profile Information
//             </h3>
//             {!isEditing ? (
//               <button
//                 onClick={handleStartEdit}
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all"
//               >
//                 <Edit3 className="w-4 h-4" />
//                 Edit Profile
//               </button>
//             ) : (
//               <button
//                 onClick={handleCancelEdit}
//                 disabled={saving}
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-all disabled:opacity-50"
//               >
//                 <X className="w-4 h-4" />
//                 Cancel
//               </button>
//             )}
//           </div>

//           <div className="p-6">
//             {/* Profile Avatar & Basic Info */}
//             <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
//               {/* Profile Image */}
//               <div className="relative group shrink-0">
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
//                   {imagePreview ? (
//                     <img 
//                       src={imagePreview} 
//                       alt="Profile" 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User className="w-12 h-12 text-muted-foreground" />
//                     </div>
//                   )}
//                 </div>
//                 {isEditing && (
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105"
//                   >
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 )}
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageSelect}
//                   className="hidden"
//                 />
//               </div>

//               {/* Name & Role */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h2 className="text-xl font-bold text-foreground">{profile?.fullName}</h2>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
//                     {profile?.role}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
//                 </p>
                
//                 {/* Permissions for subadmin */}
//                 {profile?.role === 'subadmin' && profile.permissions?.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {profile.permissions.map((permission, index) => (
//                       <span
//                         key={index}
//                         className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium capitalize"
//                       >
//                         {permission}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Transition container */}
//             <div className={`transition-all duration-300 ease-in-out ${isEditing ? 'opacity-100' : 'opacity-100'}`}>
//               {!isEditing ? (
//                 /* View Mode */
//                 <div className="space-y-6 animate-fade-in">
//                   {/* Personal Information */}
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Mail className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Email</p>
//                           <p className="text-foreground truncate">{profile?.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Phone className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Phone</p>
//                           <p className="text-foreground">{profile?.phone || 'Not provided'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
//                     <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
//                       <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-foreground">
//                           {[profile?.city, profile?.state].filter(Boolean).join(', ')}
//                         </p>
//                         <p className="text-muted-foreground text-sm">
//                           {profile?.country} {profile?.pincode && `- ${profile.pincode}`}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Edit Mode */
//                 <form onSubmit={handleProfileUpdate} className="space-y-6 animate-fade-in">
//                   {/* Personal Information */}
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
//                         <input
//                           type="text"
//                           value={editForm.fullName}
//                           onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
//                         <input
//                           type="email"
//                           value={profile?.email || ''}
//                           disabled
//                           className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-muted-foreground cursor-not-allowed"
//                         />
//                       </div>
//                       <div className="sm:col-span-2">
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
//                         <input
//                           type="tel"
//                           value={editForm.phone}
//                           onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your phone number"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
//                         <input
//                           type="text"
//                           value={editForm.country}
//                           onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Country"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
//                         <input
//                           type="text"
//                           value={editForm.state}
//                           onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="State"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
//                         <input
//                           type="text"
//                           value={editForm.city}
//                           onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="City"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Pincode</label>
//                         <input
//                           type="text"
//                           value={editForm.pincode}
//                           onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Pincode"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Save Button */}
//                   <div className="flex justify-end pt-2">
//                     <button
//                       type="submit"
//                       disabled={saving}
//                       className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {saving ? (
//                         <>
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save className="w-4 h-4" />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Change Password Section */}
//         <section className="glass-card animate-slide-up mb-6 overflow-hidden" style={{ animationDelay: '0.2s' }}>
//           <div className="p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <Lock className="w-5 h-5 text-primary" />
//               Change Password
//             </h3>
//           </div>

//           <form onSubmit={handlePasswordChange} className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//               {/* Current Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
//                 <div className="relative">
//                   <input
//                     type={showcurrentPassword ? 'text' : 'password'}
//                     value={passwordForm.currentPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
//                     className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowcurrentPassword(!showcurrentPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showcurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* New Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? 'text' : 'password'}
//                     value={passwordForm.newPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
//                     className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm New Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={passwordForm.confirmNewPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
//                     className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Password match indicator */}
//             {passwordForm.newPassword && passwordForm.confirmNewPassword && (
//               <div className={`flex items-center gap-2 text-sm mb-4 ${passwordForm.newPassword === passwordForm.confirmNewPassword ? 'text-success' : 'text-destructive'}`}>
//                 {passwordForm.newPassword === passwordForm.confirmNewPassword ? (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     Passwords match
//                   </>
//                 ) : (
//                   <>
//                     <AlertTriangle className="w-4 h-4" />
//                     Passwords do not match
//                   </>
//                 )}
//               </div>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={changingPassword}
//                 className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {changingPassword ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   <>
//                     <Lock className="w-4 h-4" />
//                     Update Password
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </section>

//         {/* Delete Account Section */}
//         <section className="glass-card animate-slide-up border border-destructive/20 overflow-hidden" style={{ animationDelay: '0.3s' }}>
//           <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-destructive mb-1 flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5" />
//                 Danger Zone
//               </h3>
//               <p className="text-muted-foreground text-sm">
//                 Once you delete your account, there is no going back.
//               </p>
//             </div>
//             <button
//               onClick={() => setShowDeleteModal(true)}
//               className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all whitespace-nowrap text-sm"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete Account
//             </button>
//           </div>
//         </section>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-background/80 backdrop-blur-sm"
//             onClick={() => !deleting && setShowDeleteModal(false)}
//           />
//           <div className="glass-card animate-scale-in relative max-w-md w-full p-6">
//             <div className="text-center">
//               <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <AlertTriangle className="w-7 h-7 text-destructive" />
//               </div>
//               <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
//               <p className="text-muted-foreground text-sm mb-6">
//                 Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
//               </p>
//               <div className="flex gap-3 justify-center">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   disabled={deleting}
//                   className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteAccount}
//                   disabled={deleting}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="w-4 h-4" />
//                       Yes, Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Camera, 
//   Save, 
//   Lock, 
//   Trash2, 
//   AlertTriangle,
//   Loader2,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   Calendar,
//   Edit3,
//   X,
//   XCircle
// } from 'lucide-react';

// // ✅ IMPORT API SERVICES
// import { 
//   getUserProfile, 
//   updateUserProfile, 
//   changeUserPassword, 
//   deleteUserProfile 
// } from '@/services/franchiseService';

// // Types
// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
//   permissions: string[];
//   country: string;
//   state: string;
//   city: string;
//   pincode: string;
//   profileImage: string | null;
//   createdAt: string;
// }

// interface PasswordForm {
//   currentPassword: string;
//   newPassword: string;
//   confirmNewPassword: string;
// }

// // Role badge color mapping
// const roleBadgeStyles: Record<string, string> = {
//   user: 'bg-secondary text-secondary-foreground',
//   admin: 'bg-primary text-primary-foreground',
//   franchise: 'bg-accent text-accent-foreground',
//   dealer: 'bg-warning text-warning-foreground',
//   subadmin: 'bg-success text-success-foreground',
// };

// const Profile: React.FC = () => {
//   // State management
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [accountDeleted, setAccountDeleted] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   const [showcurrentPassword, setShowcurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form states - REMOVED location fields from editForm
//   const [editForm, setEditForm] = useState({
//     fullName: '',
//     phone: '',
//   });

//   const [passwordForm, setPasswordForm] = useState<PasswordForm>({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getUserProfile();
//       const data: UserProfile = res.data || res;

//       setProfile(data);
//       setEditForm({
//         fullName: data.fullName || '',
//         phone: data.phone || '',
//       });
//       setImagePreview(data.profileImage || null);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || 'Failed to load profile');
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleStartEdit = () => {
//     if (profile) {
//       setEditForm({
//         fullName: profile.fullName || '',
//         phone: profile.phone || '',
//       });
//     }
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setImagePreview(profile?.profileImage || null);
//     setSelectedImage(null);
//   };

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       const formData = new FormData();
//       formData.append('fullName', editForm.fullName);
//       formData.append('phone', editForm.phone);
      
//       if (selectedImage) {
//         formData.append('profileImage', selectedImage);
//       }

//       const res = await updateUserProfile(formData);
//       setProfile(res.data || res);
//       setSelectedImage(null);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }
//     if (passwordForm.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }
//     try {
//       setChangingPassword(true);
//       await changeUserPassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       });
//       toast.success('Password changed successfully!');
//       setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to change password');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       setDeleting(true);
//       await deleteUserProfile();
//       setAccountDeleted(true);
//       setShowDeleteModal(false);
//       toast.success('Account deleted successfully');
//       setTimeout(() => { window.location.href = '/'; }, 2000);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to delete account');
//       setDeleting(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric',
//     });
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <div className="glass-card animate-fade-in flex flex-col items-center gap-4 p-8">
//         <Loader2 className="w-12 h-12 text-primary animate-spin" />
//         <p className="text-muted-foreground">Loading profile...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
//         <div className="animate-fade-in mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
//           <p className="text-muted-foreground">Manage your account settings and preferences</p>
//         </div>

//         <section className="glass-card animate-slide-up mb-6 overflow-hidden">
//           <div className="flex items-center justify-between p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <User className="w-5 h-5 text-primary" />
//               Profile Information
//             </h3>
//             {!isEditing ? (
//               <button onClick={handleStartEdit} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all">
//                 <Edit3 className="w-4 h-4" /> Edit Profile
//               </button>
//             ) : (
//               <button onClick={handleCancelEdit} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-all disabled:opacity-50">
//                 <X className="w-4 h-4" /> Cancel
//               </button>
//             )}
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
//               <div className="relative group shrink-0">
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
//                   {imagePreview ? <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User className="w-12 h-12 text-muted-foreground" /></div>}
//                 </div>
//                 {isEditing && (
//                   <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105">
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 )}
//                 <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
//               </div>

//               <div className="flex-1 min-0">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h2 className="text-xl font-bold text-foreground">{profile?.fullName}</h2>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
//                     {profile?.role}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
//                 </p>
//               </div>
//             </div>

//             <div>
//               {!isEditing ? (
//                 /* View Mode */
//                 <div className="space-y-6 animate-fade-in">
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Mail className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Email</p>
//                           <p className="text-foreground truncate">{profile?.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Phone className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Phone</p>
//                           <p className="text-foreground">{profile?.phone || 'Not provided'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
//                     <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
//                       <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-foreground">
//                           {[profile?.city, profile?.state].filter(Boolean).join(', ')}
//                         </p>
//                         <p className="text-muted-foreground text-sm">
//                           {profile?.country} {profile?.pincode && `- ${profile.pincode}`}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Edit Mode - LOCATION FIELDS REMOVED */
//                 <form onSubmit={handleProfileUpdate} className="space-y-6 animate-fade-in">
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Edit Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
//                         <input
//                           type="text"
//                           value={editForm.fullName}
//                           onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
//                         <input
//                           type="tel"
//                           value={editForm.phone}
//                           onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your phone number"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end pt-2">
//                     <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50">
//                       {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Change Password & Delete sections remain same... */}
//         <section className="glass-card animate-slide-up mb-6 overflow-hidden">
//           <div className="p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <Lock className="w-5 h-5 text-primary" />
//               Change Password
//             </h3>
//           </div>
//           <form onSubmit={handlePasswordChange} className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
//                 <div className="relative">
//                   <input type={showcurrentPassword ? 'text' : 'password'} value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowcurrentPassword(!showcurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showcurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
//                 <div className="relative">
//                   <input type={showNewPassword ? 'text' : 'password'} value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
//                 <div className="relative">
//                   <input type={showConfirmPassword ? 'text' : 'password'} value={passwordForm.confirmNewPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button type="submit" disabled={changingPassword} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
//                 {changingPassword ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Lock className="w-4 h-4" /> Update Password</>}
//               </button>
//             </div>
//           </form>
//         </section>

//         <section className="glass-card animate-slide-up border border-destructive/20 overflow-hidden">
//           <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-destructive mb-1 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Danger Zone</h3>
//               <p className="text-muted-foreground text-sm">Once you delete your account, there is no going back.</p>
//             </div>
//             <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 whitespace-nowrap text-sm">
//               <Trash2 className="w-4 h-4" /> Delete Account
//             </button>
//           </div>
//         </section>
//       </div>

//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => !deleting && setShowDeleteModal(false)} />
//           <div className="glass-card animate-scale-in relative max-w-md w-full p-6 text-center">
//             <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-7 h-7 text-destructive" /></div>
//             <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
//             <p className="text-muted-foreground text-sm mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
//             <div className="flex gap-3 justify-center">
//               <button onClick={() => setShowDeleteModal(false)} disabled={deleting} className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90">Cancel</button>
//               <button onClick={handleDeleteAccount} disabled={deleting} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90">
//                 {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : <><Trash2 className="w-4 h-4" /> Yes, Delete</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Camera, 
//   Save, 
//   Lock, 
//   Trash2, 
//   AlertTriangle,
//   Loader2,
//   Eye,
//   EyeOff,
//   Calendar,
//   Edit3,
//   X
// } from 'lucide-react';

// // ✅ IMPORT API SERVICES
// import { 
//   getUserProfile, 
//   updateUserProfile, 
//   changeUserPassword, 
//   deleteUserProfile 
// } from '@/services/franchiseService';

// // ✅ IMPORT TERRITORY MANAGER (Ye line add ki hai)
// // Make sure path sahi ho, e.g., "../components/TerritoryManager"
// import TerritoryManager from '../../pages/franchise/pages/TerritoryManager';

// // Types
// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
//   permissions: string[];
//   country: string;
//   state: string;
//   city: string;
//   pincode: string;
//   profileImage: string | null;
//   createdAt: string;
// }

// interface PasswordForm {
//   currentPassword: string;
//   newPassword: string;
//   confirmNewPassword: string;
// }

// // Role badge color mapping
// const roleBadgeStyles: Record<string, string> = {
//   user: 'bg-secondary text-secondary-foreground',
//   admin: 'bg-primary text-primary-foreground',
//   franchise: 'bg-accent text-accent-foreground',
//   dealer: 'bg-warning text-warning-foreground',
//   subadmin: 'bg-success text-success-foreground',
// };

// const Profile: React.FC = () => {
//   // State management
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [accountDeleted, setAccountDeleted] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   const [showcurrentPassword, setShowcurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form states
//   const [editForm, setEditForm] = useState({
//     fullName: '',
//     phone: '',
//   });

//   const [passwordForm, setPasswordForm] = useState<PasswordForm>({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getUserProfile();
//       const data: UserProfile = res.data || res;

//       setProfile(data);
//       setEditForm({
//         fullName: data.fullName || '',
//         phone: data.phone || '',
//       });
//       setImagePreview(data.profileImage || null);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || 'Failed to load profile');
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleStartEdit = () => {
//     if (profile) {
//       setEditForm({
//         fullName: profile.fullName || '',
//         phone: profile.phone || '',
//       });
//     }
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setImagePreview(profile?.profileImage || null);
//     setSelectedImage(null);
//   };

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       const formData = new FormData();
//       formData.append('fullName', editForm.fullName);
//       formData.append('phone', editForm.phone);
      
//       if (selectedImage) {
//         formData.append('profileImage', selectedImage);
//       }

//       const res = await updateUserProfile(formData);
//       setProfile(res.data || res);
//       setSelectedImage(null);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }
//     if (passwordForm.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }
//     try {
//       setChangingPassword(true);
//       await changeUserPassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       });
//       toast.success('Password changed successfully!');
//       setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to change password');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       setDeleting(true);
//       await deleteUserProfile();
//       setAccountDeleted(true);
//       setShowDeleteModal(false);
//       toast.success('Account deleted successfully');
//       setTimeout(() => { window.location.href = '/'; }, 2000);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to delete account');
//       setDeleting(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric',
//     });
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <div className="glass-card animate-fade-in flex flex-col items-center gap-4 p-8">
//         <Loader2 className="w-12 h-12 text-primary animate-spin" />
//         <p className="text-muted-foreground">Loading profile...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
//         <div className="animate-fade-in mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
//           <p className="text-muted-foreground">Manage your account settings and preferences</p>
//         </div>

//         {/* 1. PERSONAL INFO SECTION (SAME AS BEFORE) */}
//         <section className="glass-card animate-slide-up mb-6 overflow-hidden">
//           <div className="flex items-center justify-between p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <User className="w-5 h-5 text-primary" />
//               Profile Information
//             </h3>
//             {!isEditing ? (
//               <button onClick={handleStartEdit} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all">
//                 <Edit3 className="w-4 h-4" /> Edit Profile
//               </button>
//             ) : (
//               <button onClick={handleCancelEdit} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-all disabled:opacity-50">
//                 <X className="w-4 h-4" /> Cancel
//               </button>
//             )}
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
//               <div className="relative group shrink-0">
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
//                   {imagePreview ? <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User className="w-12 h-12 text-muted-foreground" /></div>}
//                 </div>
//                 {isEditing && (
//                   <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105">
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 )}
//                 <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
//               </div>

//               <div className="flex-1 min-0">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h2 className="text-xl font-bold text-foreground">{profile?.fullName}</h2>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
//                     {profile?.role}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
//                 </p>
//               </div>
//             </div>

//             <div>
//               {!isEditing ? (
//                 /* View Mode */
//                 <div className="space-y-6 animate-fade-in">
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Mail className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Email</p>
//                           <p className="text-foreground truncate">{profile?.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
//                         <Phone className="w-5 h-5 text-primary shrink-0" />
//                         <div className="min-w-0">
//                           <p className="text-xs text-muted-foreground">Phone</p>
//                           <p className="text-foreground">{profile?.phone || 'Not provided'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
//                     <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
//                       <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-foreground">
//                           {[profile?.city, profile?.state].filter(Boolean).join(', ')}
//                         </p>
//                         <p className="text-muted-foreground text-sm">
//                           {profile?.country} {profile?.pincode && `- ${profile.pincode}`}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Edit Mode */
//                 <form onSubmit={handleProfileUpdate} className="space-y-6 animate-fade-in">
//                   <div>
//                     <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Edit Information</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
//                         <input
//                           type="text"
//                           value={editForm.fullName}
//                           onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
//                         <input
//                           type="tel"
//                           value={editForm.phone}
//                           onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                           className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                           placeholder="Enter your phone number"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end pt-2">
//                     <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50">
//                       {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* ✅ NEW SECTION: TERRITORY MANAGER (Integrated Here) */}
//         {profile?.role === 'franchise' && (
//           <div className="mb-6 animate-slide-up">
//             <TerritoryManager />
//           </div>
//         )}

//         {/* 2. CHANGE PASSWORD SECTION (SAME AS BEFORE) */}
//         <section className="glass-card animate-slide-up mb-6 overflow-hidden">
//           <div className="p-6 border-b border-border/50">
//             <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
//               <Lock className="w-5 h-5 text-primary" />
//               Change Password
//             </h3>
//           </div>
//           <form onSubmit={handlePasswordChange} className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
//                 <div className="relative">
//                   <input type={showcurrentPassword ? 'text' : 'password'} value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowcurrentPassword(!showcurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showcurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
//                 <div className="relative">
//                   <input type={showNewPassword ? 'text' : 'password'} value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
//                 <div className="relative">
//                   <input type={showConfirmPassword ? 'text' : 'password'} value={passwordForm.confirmNewPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
//                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button type="submit" disabled={changingPassword} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
//                 {changingPassword ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Lock className="w-4 h-4" /> Update Password</>}
//               </button>
//             </div>
//           </form>
//         </section>

//         {/* 3. DELETE ACCOUNT SECTION (SAME AS BEFORE) */}
//         <section className="glass-card animate-slide-up border border-destructive/20 overflow-hidden">
//           <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-destructive mb-1 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Danger Zone</h3>
//               <p className="text-muted-foreground text-sm">Once you delete your account, there is no going back.</p>
//             </div>
//             <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 whitespace-nowrap text-sm">
//               <Trash2 className="w-4 h-4" /> Delete Account
//             </button>
//           </div>
//         </section>
//       </div>

//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => !deleting && setShowDeleteModal(false)} />
//           <div className="glass-card animate-scale-in relative max-w-md w-full p-6 text-center">
//             <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-7 h-7 text-destructive" /></div>
//             <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
//             <p className="text-muted-foreground text-sm mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
//             <div className="flex gap-3 justify-center">
//               <button onClick={() => setShowDeleteModal(false)} disabled={deleting} className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90">Cancel</button>
//               <button onClick={handleDeleteAccount} disabled={deleting} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90">
//                 {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : <><Trash2 className="w-4 h-4" /> Yes, Delete</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
  User, Mail, Phone, MapPin, Camera, Save, Lock, Trash2, 
  AlertTriangle, Loader2, Eye, EyeOff, Calendar, Edit3, X,
  Building2, Briefcase, CreditCard, Upload, FileText
} from 'lucide-react';

// ✅ IMPORT API SERVICES
import { 
  getUserProfile, 
  updateUserProfile, 
  changeUserPassword, 
  deleteUserProfile 
} from '@/services/franchiseService';

// ✅ IMPORT TERRITORY MANAGER
import TerritoryManager from '../../pages/franchise/pages/TerritoryManager';

// Updated Interface matching new Backend Model
interface UserProfile {
  // User Fields
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
  profileImage: string | null;
  createdAt: string;
  
  // Franchise Fields
  franchiseName?: string;
  address?: string;
  workingHours?: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    upiId: string;
  };
  documents?: { docName: string; docUrl: string }[];
  
  // Location (Keep for compatibility)
  country?: any;
  state?: any;
  city?: any;
  pincode?: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const roleBadgeStyles: Record<string, string> = {
  user: 'bg-secondary text-secondary-foreground',
  admin: 'bg-primary text-primary-foreground',
  franchise: 'bg-accent text-accent-foreground',
  dealer: 'bg-warning text-warning-foreground',
  subadmin: 'bg-success text-success-foreground',
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<FileList | null>(null); // For KYC Docs
  const [isEditing, setIsEditing] = useState(false);
  
  const [showcurrentPassword, setShowcurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Updated Form State with All Fields
  const [editForm, setEditForm] = useState({
    // User
    fullName: '',
    email: '',
    phone: '',
    
    // Franchise Info
    franchiseName: '',
    address: '',
    workingHours: '',
    pincode: '',    
    // Bank Details (Flattened for Form)
    bankAccountNumber: '',
    ifscCode: '',
    bankName: '',
    upiId: ''
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile();
      
      // Backend returns { user, franchise } or just user data depending on endpoint
      // Assuming response structure might be nested or flat. 
      // Mapping logic below handles both scenarios safely.
      
      const userData = res.data?.user || res.data || {};
      const franchiseData = res.data?.franchise || {};

      // Merge data for UI
      const mergedProfile = { ...userData, ...franchiseData };
      setProfile(mergedProfile);
      setImagePreview(mergedProfile.profileImage || null);

      // Populate Edit Form
      setEditForm({
        fullName: mergedProfile.fullName || '',
        email: mergedProfile.email || '',
        phone: mergedProfile.phone || '',
        franchiseName: mergedProfile.franchiseName || '',
        address: mergedProfile.address || '',
        workingHours: mergedProfile.workingHours || '',
          pincode: mergedProfile.pincode || '',
          // ✅ DIRECT FIELDS (Correct)
  bankAccountNumber: mergedProfile.bankAccountNumber || '',
  ifscCode: mergedProfile.ifscCode || '',
  bankName: mergedProfile.bankName || '',
  upiId: mergedProfile.upiId || ''
      });

    } catch (err: any) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset preview to original
    setImagePreview(profile?.profileImage || null);
    setSelectedImage(null);
    setSelectedDocs(null);
    
    // Reset form to original data
    if (profile) {
      setEditForm({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        franchiseName: profile.franchiseName || '',
        address: profile.address || '',
        workingHours: profile.workingHours || '',
          pincode: mergedProfile.pincode || '',
        bankAccountNumber: profile.bankDetails?.accountNumber || '',
        ifscCode: profile.bankDetails?.ifscCode || '',
        bankName: profile.bankDetails?.bankName || '',
        upiId: profile.bankDetails?.upiId || ''
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();

      // Append all text fields
      Object.keys(editForm).forEach(key => {
        formData.append(key, (editForm as any)[key]);
      });
      
      // Append Profile Image
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      // Append KYC Documents
      if (selectedDocs) {
        Array.from(selectedDocs).forEach((file) => {
          formData.append('documents', file);
        });
      }

      const res = await updateUserProfile(formData);
      
      // Update local state with new data
      const updatedUser = res.data?.user || {};
      const updatedFranchise = res.data?.franchise || {};
      const merged = { ...updatedUser, ...updatedFranchise };
      
      setProfile(merged);
      setIsEditing(false);
      setSelectedImage(null);
      setSelectedDocs(null);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      setChangingPassword(true);
      await changeUserPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      await deleteUserProfile();
      setAccountDeleted(true);
      setShowDeleteModal(false);
      toast.success('Account deleted');
      setTimeout(() => { window.location.href = '/'; }, 2000);
    } catch (err: any) {
      toast.error('Failed to delete account');
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-fade-in mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your franchise details and account settings</p>
        </div>

        {/* 1. MAIN PROFILE FORM */}
        <section className="glass-card animate-slide-up mb-6 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </h3>
            {!isEditing ? (
              <button onClick={handleStartEdit} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all">
                <Edit3 className="w-4 h-4" /> Edit Details
              </button>
            ) : (
              <button onClick={handleCancelEdit} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-all disabled:opacity-50">
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>

          <div className="p-6">
            {/* Header Image & Role */}
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
                  {imagePreview ? <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User className="w-12 h-12 text-muted-foreground" /></div>}
                </div>
                {isEditing && (
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              </div>

              <div className="flex-1 min-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-foreground">{profile?.fullName}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
                    {profile?.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                   <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {profile?.email}</span>
                   <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {profile?.phone}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-8 animate-fade-in">
              
              {/* --- A. CONTACT PERSON (User Info) --- */}
              <div>
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> Contact Person
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
                    <input 
                      disabled={!isEditing}
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                      className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                    <input 
                      disabled={!isEditing}
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
                    <input 
                      disabled={!isEditing}
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* --- B. FRANCHISE INFO --- */}
              {profile?.role === 'franchise' && (
                <>
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Franchise Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Franchise Name</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.franchiseName}
                          onChange={(e) => setEditForm({...editForm, franchiseName: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="e.g. My Car Zone"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Working Hours</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.workingHours}
                          onChange={(e) => setEditForm({...editForm, workingHours: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="e.g. Mon-Sat: 10AM - 7PM"
                        />
                      </div>
                      <div>
  <label className="text-xs font-medium text-muted-foreground mb-1 block">
    Pincode
  </label>
  <input
    value={editForm.pincode}
    disabled={true}   // 🔒 ALWAYS DISABLED
    className="w-full px-3 py-2 bg-secondary/40 border border-border/50 rounded-md cursor-not-allowed opacity-80"
  />
</div>

                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Address</label>
                        <textarea 
                          disabled={!isEditing}
                          value={editForm.address}
                          onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70 min-h-[60px]"
                          placeholder="Full office address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- C. BANK DETAILS --- */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Bank Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Bank Name</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.bankName}
                          onChange={(e) => setEditForm({...editForm, bankName: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="e.g. HDFC Bank"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Account Number</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.bankAccountNumber}
                          onChange={(e) => setEditForm({...editForm, bankAccountNumber: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="XXXXXXXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">IFSC Code</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.ifscCode}
                          onChange={(e) => setEditForm({...editForm, ifscCode: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="HDFC0001234"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">UPI ID</label>
                        <input 
                          disabled={!isEditing}
                          value={editForm.upiId}
                          onChange={(e) => setEditForm({...editForm, upiId: e.target.value})}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/50 rounded-md disabled:opacity-70"
                          placeholder="name@okaxis"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- D. DOCUMENTS --- */}
                  {isEditing && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Documents
                      </h4>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/20 transition-colors">
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          id="doc-upload" 
                          onChange={(e) => setSelectedDocs(e.target.files)}
                        />
                        <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center">
                          <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium text-foreground">Click to upload KYC documents</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {selectedDocs ? `${selectedDocs.length} files selected` : "PDF, JPG, PNG (Max 5MB)"}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* SAVE BUTTON */}
              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-border/50">
                  <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...</> : <><Save className="w-4 h-4" /> Save Profile</>}
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ✅ TERRITORY MANAGER */}
        {profile?.role === 'franchise' && (
          <div className="mb-6 animate-slide-up">
            <TerritoryManager />
          </div>
        )}

        {/* 2. CHANGE PASSWORD SECTION (Existing) */}
        <section className="glass-card animate-slide-up mb-6 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Change Password
            </h3>
          </div>
          <form onSubmit={handlePasswordChange} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                <div className="relative">
                  <input type={showcurrentPassword ? 'text' : 'password'} value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowcurrentPassword(!showcurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showcurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                <div className="relative">
                  <input type={showNewPassword ? 'text' : 'password'} value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} value={passwordForm.confirmNewPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })} className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={changingPassword} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
                {changingPassword ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Lock className="w-4 h-4" /> Update Password</>}
              </button>
            </div>
          </form>
        </section>

        {/* 3. DELETE ACCOUNT SECTION (Existing) */}
        <section className="glass-card animate-slide-up border border-destructive/20 overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Danger Zone</h3>
              <p className="text-muted-foreground text-sm">Delete your account,</p>
            </div>
            <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 whitespace-nowrap text-sm">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </section>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => !deleting && setShowDeleteModal(false)} />
          <div className="glass-card animate-scale-in relative max-w-md w-full p-6 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-7 h-7 text-destructive" /></div>
            <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
            <p className="text-muted-foreground text-sm mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowDeleteModal(false)} disabled={deleting} className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90">Cancel</button>
              <button onClick={handleDeleteAccount} disabled={deleting} className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90">
                {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : <><Trash2 className="w-4 h-4" /> Yes, Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;