// // import React, { useState, useEffect, useRef } from 'react';
// // import { toast } from 'sonner';
// // import { 
// //   User, 
// //   Mail, 
// //   Phone, 
// //   MapPin, 
// //   Shield, 
// //   Camera, 
// //   Save, 
// //   Lock, 
// //   Trash2, 
// //   AlertTriangle,
// //   Loader2,
// //   Eye,
// //   EyeOff,
// //   CheckCircle,
// //   XCircle
// // } from 'lucide-react';

// // // API Base URL - configure as needed
// // const API_BASE = '/api';

// // // Types
// // interface UserProfile {
// //   fullName: string;
// //   email: string;
// //   phone: string;
// //   role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
// //   permissions: string[];
// //   country: string;
// //   state: string;
// //   city: string;
// //   pincode: string;
// //   profileImage: string;
// //   franchiseId?: string;
// //   createdAt: string;
// // }

// // interface PasswordForm {
// //   currentPassword: string;
// //   newPassword: string;
// //   confirmNewPassword: string;
// // }

// // // Role badge color mapping
// // const roleBadgeStyles: Record<string, string> = {
// //   user: 'bg-secondary text-secondary-foreground',
// //   admin: 'bg-primary text-primary-foreground',
// //   franchise: 'bg-accent text-accent-foreground',
// //   dealer: 'bg-warning text-warning-foreground',
// //   subadmin: 'bg-success text-success-foreground',
// // };

// // const Profile: React.FC = () => {
// //   // State management
// //   const [profile, setProfile] = useState<UserProfile | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [saving, setSaving] = useState(false);
// //   const [changingPassword, setChangingPassword] = useState(false);
// //   const [deleting, setDeleting] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
// //   // Password visibility toggles
// //   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
// //   const [showNewPassword, setShowNewPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   // Form states
// //   const [editForm, setEditForm] = useState({
// //     fullName: '',
// //     phone: '',
// //     country: '',
// //     state: '',
// //     city: '',
// //     pincode: '',
// //   });

// //   const [passwordForm, setPasswordForm] = useState<PasswordForm>({
// //     currentPassword: '',
// //     newPassword: '',
// //     confirmNewPassword: '',
// //   });

// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   // Fetch profile on mount
// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   // API call to fetch profile
// //   const fetchProfile = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await fetch(`${API_BASE}/profile`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // Authorization header is assumed to be handled by interceptor
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to fetch profile');
// //       }

// //       const data: UserProfile = await response.json();
// //       setProfile(data);
// //       setEditForm({
// //         fullName: data.fullName || '',
// //         phone: data.phone || '',
// //         country: data.country || '',
// //         state: data.state || '',
// //         city: data.city || '',
// //         pincode: data.pincode || '',
// //       });
// //       setImagePreview(data.profileImage || null);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'An error occurred');
// //       toast.error('Failed to load profile');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle profile image selection
// //   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       if (file.size > 5 * 1024 * 1024) {
// //         toast.error('Image size should be less than 5MB');
// //         return;
// //       }
// //       setSelectedImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // Handle profile update
// //   const handleProfileUpdate = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     try {
// //       setSaving(true);
      
// //       const formData = new FormData();
// //       formData.append('fullName', editForm.fullName);
// //       formData.append('phone', editForm.phone);
// //       formData.append('country', editForm.country);
// //       formData.append('state', editForm.state);
// //       formData.append('city', editForm.city);
// //       formData.append('pincode', editForm.pincode);
      
// //       if (selectedImage) {
// //         formData.append('profileImage', selectedImage);
// //       }

// //       const response = await fetch(`${API_BASE}/profile`, {
// //         method: 'PUT',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to update profile');
// //       }

// //       const updatedProfile = await response.json();
// //       setProfile(updatedProfile);
// //       setSelectedImage(null);
// //       toast.success('Profile updated successfully!');
// //     } catch (err) {
// //       toast.error(err instanceof Error ? err.message : 'Failed to update profile');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // Handle password change
// //   const handlePasswordChange = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Validation
// //     if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
// //       toast.error('New passwords do not match');
// //       return;
// //     }

// //     if (passwordForm.newPassword.length < 8) {
// //       toast.error('Password must be at least 8 characters');
// //       return;
// //     }

// //     try {
// //       setChangingPassword(true);

// //       const response = await fetch(`${API_BASE}/profile/password`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           currentPassword: passwordForm.currentPassword,
// //           newPassword: passwordForm.newPassword,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to change password');
// //       }

// //       toast.success('Password changed successfully!');
// //       setPasswordForm({
// //         currentPassword: '',
// //         newPassword: '',
// //         confirmNewPassword: '',
// //       });
// //     } catch (err) {
// //       toast.error(err instanceof Error ? err.message : 'Failed to change password');
// //     } finally {
// //       setChangingPassword(false);
// //     }
// //   };

// //   // Handle account deletion
// //   const handleDeleteAccount = async () => {
// //     try {
// //       setDeleting(true);

// //       const response = await fetch(`${API_BASE}/profile`, {
// //         method: 'DELETE',
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to delete account');
// //       }

// //       toast.success('Account deleted successfully');
// //       // Redirect to logout or home page
// //       window.location.href = '/';
// //     } catch (err) {
// //       toast.error(err instanceof Error ? err.message : 'Failed to delete account');
// //       setDeleting(false);
// //       setShowDeleteModal(false);
// //     }
// //   };

// //   // Format date for display
// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //     });
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <div className="glass-card animate-fade-in flex flex-col items-center gap-4">
// //           <Loader2 className="w-12 h-12 text-primary animate-spin" />
// //           <p className="text-muted-foreground">Loading profile...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error && !profile) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center p-4">
// //         <div className="glass-card animate-fade-in max-w-md w-full text-center">
// //           <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
// //           <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Profile</h2>
// //           <p className="text-muted-foreground mb-6">{error}</p>
// //           <button
// //             onClick={fetchProfile}
// //             className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Background decoration */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
// //       </div>

// //       <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
// //         {/* Header */}
// //         <div className="animate-fade-in mb-8">
// //           <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
// //           <p className="text-muted-foreground">Manage your account settings and preferences</p>
// //         </div>

// //         {/* Profile Info Section */}
// //         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.1s' }}>
// //           <div className="flex flex-col md:flex-row gap-6 items-start">
// //             {/* Profile Image */}
// //             <div className="relative group">
// //               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
// //                 {imagePreview ? (
// //                   <img 
// //                     src={imagePreview} 
// //                     alt="Profile" 
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-full h-full bg-secondary flex items-center justify-center">
// //                     <User className="w-16 h-16 text-muted-foreground" />
// //                   </div>
// //                 )}
// //               </div>
// //               <button
// //                 onClick={() => fileInputRef.current?.click()}
// //                 className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105"
// //               >
// //                 <Camera className="w-5 h-5" />
// //               </button>
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageSelect}
// //                 className="hidden"
// //               />
// //             </div>

// //             {/* Profile Details */}
// //             <div className="flex-1">
// //               <div className="flex flex-wrap items-center gap-3 mb-4">
// //                 <h2 className="text-2xl font-bold text-foreground">{profile?.fullName}</h2>
// //                 <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
// //                   {profile?.role}
// //                 </span>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="flex items-center gap-3 text-muted-foreground">
// //                   <Mail className="w-5 h-5 text-primary" />
// //                   <span>{profile?.email}</span>
// //                 </div>
// //                 <div className="flex items-center gap-3 text-muted-foreground">
// //                   <Phone className="w-5 h-5 text-primary" />
// //                   <span>{profile?.phone || 'Not provided'}</span>
// //                 </div>
// //                 <div className="flex items-center gap-3 text-muted-foreground">
// //                   <MapPin className="w-5 h-5 text-primary" />
// //                   <span>
// //                     {[profile?.city, profile?.state, profile?.country].filter(Boolean).join(', ') || 'Not provided'}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-3 text-muted-foreground">
// //                   <Shield className="w-5 h-5 text-primary" />
// //                   <span>Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}</span>
// //                 </div>
// //               </div>

// //               {/* Permissions for subadmin */}
// //               {profile?.role === 'subadmin' && profile.permissions?.length > 0 && (
// //                 <div className="mt-4 pt-4 border-t border-border">
// //                   <h3 className="text-sm font-medium text-foreground mb-2">Permissions</h3>
// //                   <div className="flex flex-wrap gap-2">
// //                     {profile.permissions.map((permission, index) => (
// //                       <span
// //                         key={index}
// //                         className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
// //                       >
// //                         {permission}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Edit Profile Section */}
// //         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.2s' }}>
// //           <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
// //             <User className="w-5 h-5 text-primary" />
// //             Edit Profile
// //           </h3>

// //           <form onSubmit={handleProfileUpdate} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Full Name */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Full Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editForm.fullName}
// //                   onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your full name"
// //                 />
// //               </div>

// //               {/* Email (Read-only) */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Email Address
// //                 </label>
// //                 <input
// //                   type="email"
// //                   value={profile?.email || ''}
// //                   disabled
// //                   className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-muted-foreground cursor-not-allowed"
// //                 />
// //               </div>

// //               {/* Phone */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Phone Number
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   value={editForm.phone}
// //                   onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your phone number"
// //                 />
// //               </div>

// //               {/* Country */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Country
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editForm.country}
// //                   onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your country"
// //                 />
// //               </div>

// //               {/* State */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   State
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editForm.state}
// //                   onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your state"
// //                 />
// //               </div>

// //               {/* City */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   City
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editForm.city}
// //                   onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your city"
// //                 />
// //               </div>

// //               {/* Pincode */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Pincode
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editForm.pincode}
// //                   onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
// //                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                   placeholder="Enter your pincode"
// //                 />
// //               </div>
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={saving}
// //               className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {saving ? (
// //                 <Loader2 className="w-5 h-5 animate-spin" />
// //               ) : (
// //                 <Save className="w-5 h-5" />
// //               )}
// //               {saving ? 'Saving...' : 'Save Changes'}
// //             </button>
// //           </form>
// //         </section>

// //         {/* Change Password Section */}
// //         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.3s' }}>
// //           <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
// //             <Lock className="w-5 h-5 text-primary" />
// //             Change Password
// //           </h3>

// //           <form onSubmit={handlePasswordChange} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               {/* Current Password */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Current Password
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type={showCurrentPassword ? 'text' : 'password'}
// //                     value={passwordForm.currentPassword}
// //                     onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
// //                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                     placeholder="••••••••"
// //                     required
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowCurrentPassword(!showCurrentPassword)}
// //                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
// //                   >
// //                     {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* New Password */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   New Password
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type={showNewPassword ? 'text' : 'password'}
// //                     value={passwordForm.newPassword}
// //                     onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
// //                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                     placeholder="••••••••"
// //                     required
// //                     minLength={8}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowNewPassword(!showNewPassword)}
// //                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
// //                   >
// //                     {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Confirm New Password */}
// //               <div>
// //                 <label className="block text-sm font-medium text-foreground mb-2">
// //                   Confirm New Password
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type={showConfirmPassword ? 'text' : 'password'}
// //                     value={passwordForm.confirmNewPassword}
// //                     onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
// //                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
// //                     placeholder="••••••••"
// //                     required
// //                     minLength={8}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
// //                   >
// //                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Password match indicator */}
// //             {passwordForm.newPassword && passwordForm.confirmNewPassword && (
// //               <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmNewPassword ? 'text-success' : 'text-destructive'}`}>
// //                 {passwordForm.newPassword === passwordForm.confirmNewPassword ? (
// //                   <>
// //                     <CheckCircle className="w-4 h-4" />
// //                     <span>Passwords match</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <XCircle className="w-4 h-4" />
// //                     <span>Passwords do not match</span>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             <button
// //               type="submit"
// //               disabled={changingPassword || passwordForm.newPassword !== passwordForm.confirmNewPassword}
// //               className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {changingPassword ? (
// //                 <Loader2 className="w-5 h-5 animate-spin" />
// //               ) : (
// //                 <Lock className="w-5 h-5" />
// //               )}
// //               {changingPassword ? 'Updating...' : 'Update Password'}
// //             </button>
// //           </form>
// //         </section>

// //         {/* Delete Account Section */}
// //         <section className="glass-card animate-slide-up border-destructive/30" style={{ animationDelay: '0.4s' }}>
// //           <h3 className="text-xl font-semibold text-destructive mb-4 flex items-center gap-2">
// //             <AlertTriangle className="w-5 h-5" />
// //             Danger Zone
// //           </h3>

// //           <p className="text-muted-foreground mb-6">
// //             Once you delete your account, there is no going back. Please be certain.
// //           </p>

// //           <button
// //             onClick={() => setShowDeleteModal(true)}
// //             className="flex items-center justify-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-all"
// //           >
// //             <Trash2 className="w-5 h-5" />
// //             Delete Account
// //           </button>
// //         </section>
// //       </div>

// //       {/* Delete Confirmation Modal */}
// //       {showDeleteModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
// //           <div className="glass-card max-w-md w-full animate-scale-in">
// //             <div className="text-center">
// //               <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <AlertTriangle className="w-8 h-8 text-destructive" />
// //               </div>
// //               <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
// //               <p className="text-muted-foreground mb-6">
// //                 This action is irreversible. All your data will be permanently deleted.
// //               </p>

// //               <div className="flex gap-4 justify-center">
// //                 <button
// //                   onClick={() => setShowDeleteModal(false)}
// //                   disabled={deleting}
// //                   className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleDeleteAccount}
// //                   disabled={deleting}
// //                   className="flex items-center gap-2 px-6 py-2.5 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
// //                 >
// //                   {deleting ? (
// //                     <Loader2 className="w-5 h-5 animate-spin" />
// //                   ) : (
// //                     <Trash2 className="w-5 h-5" />
// //                   )}
// //                   {deleting ? 'Deleting...' : 'Yes, Delete'}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;

// import React, { useState, useEffect, useRef } from "react";
// import { toast } from "sonner";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Shield,
//   Camera,
//   Save,
//   Lock,
//   Trash2,
//   AlertTriangle,
//   Loader2,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// // ✅ PROFILE SERVICES (CORRECT)
// import {
//   getUserProfile,
//   updateUserProfile,
//   changeUserPassword,
//   deleteUserProfile,
// } from "@/services/franchiseService";

// // ================= TYPES =================
// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   role: "user" | "admin" | "franchise" | "dealer" | "subadmin";
//   permissions: string[];
//   country: string;
//   state: string;
//   city: string;
//   pincode: string;
//   profileImage: string;
//   createdAt: string;
// }

// interface PasswordForm {
//   currentPassword: string;
//   newPassword: string;
//   confirmNewPassword: string;
// }

// // ================= ROLE BADGES =================
// const roleBadgeStyles: Record<string, string> = {
//   user: "bg-secondary text-secondary-foreground",
//   admin: "bg-primary text-primary-foreground",
//   franchise: "bg-accent text-accent-foreground",
//   dealer: "bg-warning text-warning-foreground",
//   subadmin: "bg-success text-success-foreground",
// };

// const Profile: React.FC = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [editForm, setEditForm] = useState({
//     fullName: "",
//     phone: "",
//     country: "",
//     state: "",
//     city: "",
//     pincode: "",
//   });

//   const [passwordForm, setPasswordForm] = useState<PasswordForm>({
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // ================= FETCH PROFILE =================
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await getUserProfile();
//       const data = res.data || res;

//       setProfile(data);
//       setEditForm({
//         fullName: data.fullName || "",
//         phone: data.phone || "",
//         country: data.country || "",
//         state: data.state || "",
//         city: data.city || "",
//         pincode: data.pincode || "",
//       });
//       setImagePreview(data.profileImage || null);
//     } catch (err: any) {
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= IMAGE SELECT =================
//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be under 5MB");
//       return;
//     }

//     setSelectedImage(file);
//     const reader = new FileReader();
//     reader.onload = () => setImagePreview(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   // ================= UPDATE PROFILE =================
//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       const formData = new FormData();

//       Object.entries(editForm).forEach(([key, value]) =>
//         formData.append(key, value)
//       );

//       if (selectedImage) {
//         formData.append("profileImage", selectedImage);
//       }

//       const res = await updateUserProfile(formData);
//       setProfile(res.data || res);
//       toast.success("Profile updated");
//     } catch {
//       toast.error("Profile update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= CHANGE PASSWORD =================
//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setChangingPassword(true);
//       await changeUserPassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       });

//       toast.success("Password updated");
//       setPasswordForm({
//         currentPassword: "",
//         newPassword: "",
//         confirmNewPassword: "",
//       });
//     } catch {
//       toast.error("Password update failed");
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   // ================= DELETE ACCOUNT =================
//   const handleDeleteAccount = async () => {
//     try {
//       setDeleting(true);
//       await deleteUserProfile();
//       toast.success("Account deleted");
//       window.location.href = "/";
//     } catch {
//       toast.error("Delete failed");
//       setDeleting(false);
//       setShowDeleteModal(false);
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-10 h-10 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // ================= UI =================
//   return (
//     <div className="container max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//       {/* PROFILE CARD */}
//       <div className="glass-card mb-6 p-6 flex gap-6">
//         <div className="relative">
//           <img
//             src={imagePreview || ""}
//             className="w-32 h-32 rounded-full object-cover"
//           />
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="absolute bottom-1 right-1 bg-primary p-2 rounded-full"
//           >
//             <Camera className="w-4 h-4 text-white" />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             hidden
//             onChange={handleImageSelect}
//           />
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold">{profile?.fullName}</h2>
//           <span
//             className={`px-3 py-1 rounded-full text-sm ${roleBadgeStyles[profile!.role]}`}
//           >
//             {profile?.role}
//           </span>

//           <p className="mt-2 flex items-center gap-2">
//             <Mail size={16} /> {profile?.email}
//           </p>
//           <p className="flex items-center gap-2">
//             <Phone size={16} /> {profile?.phone || "N/A"}
//           </p>
//           <p className="flex items-center gap-2">
//             <MapPin size={16} /> {profile?.city}, {profile?.state}
//           </p>
//         </div>
//       </div>

//       {/* EDIT PROFILE */}
//       <form onSubmit={handleProfileUpdate} className="glass-card p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

//         <div className="grid grid-cols-2 gap-4">
//           {Object.entries(editForm).map(([key, value]) => (
//             <input
//               key={key}
//               placeholder={key}
//               value={value}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, [key]: e.target.value })
//               }
//               className="input"
//             />
//           ))}
//         </div>

//         <button className="btn-primary mt-4" disabled={saving}>
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </form>

//       {/* CHANGE PASSWORD */}
//       <form onSubmit={handlePasswordChange} className="glass-card p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Change Password</h3>

//         <input
//           type="password"
//           placeholder="Current Password"
//           value={passwordForm.currentPassword}
//           onChange={(e) =>
//             setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
//           }
//           className="input mb-3"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={passwordForm.newPassword}
//           onChange={(e) =>
//             setPasswordForm({ ...passwordForm, newPassword: e.target.value })
//           }
//           className="input mb-3"
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={passwordForm.confirmNewPassword}
//           onChange={(e) =>
//             setPasswordForm({
//               ...passwordForm,
//               confirmNewPassword: e.target.value,
//             })
//           }
//           className="input mb-3"
//         />

//         <button className="btn-primary" disabled={changingPassword}>
//           Update Password
//         </button>
//       </form>

//       {/* DELETE */}
//       <button
//         className="btn-destructive"
//         onClick={() => setShowDeleteModal(true)}
//       >
//         Delete Account
//       </button>

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="glass-card p-6">
//             <p>Are you sure?</p>
//             <div className="flex gap-4 mt-4">
//               <button onClick={handleDeleteAccount} className="btn-destructive">
//                 Yes
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="btn-secondary"
//               >
//                 Cancel
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
//   Shield, 
//   Camera, 
//   Save, 
//   Lock, 
//   Trash2, 
//   AlertTriangle,
//   Loader2,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';

// // ✅ IMPORT API SERVICES
// // Ensure this path matches where you saved your service file
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
//   profileImage: string;
//   franchiseId?: string;
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
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
//   // Password visibility toggles
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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

//   // API call to fetch profile
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // ✅ API CALL
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
//       setError(err?.response?.data?.message || err.message || 'An error occurred');
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
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle profile update
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

//       // ✅ API CALL
//       const res = await updateUserProfile(formData);
//       const updatedProfile = res.data || res;

//       setProfile(updatedProfile);
//       setSelectedImage(null);
//       toast.success('Profile updated successfully!');
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
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

//       // ✅ API CALL
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

//   // Handle account deletion
//   const handleDeleteAccount = async () => {
//     try {
//       setDeleting(true);

//       // ✅ API CALL
//       await deleteUserProfile();

//       toast.success('Account deleted successfully');
//       // Redirect to logout or home page
//       window.location.href = '/';
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
//         <div className="glass-card animate-fade-in flex flex-col items-center gap-4">
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
//         <div className="glass-card animate-fade-in max-w-md w-full text-center">
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

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Background decoration */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="animate-fade-in mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
//           <p className="text-muted-foreground">Manage your account settings and preferences</p>
//         </div>

//         {/* Profile Info Section */}
//         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.1s' }}>
//           <div className="flex flex-col md:flex-row gap-6 items-start">
//             {/* Profile Image */}
//             <div className="relative group">
//               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
//                 {imagePreview ? (
//                   <img 
//                     src={imagePreview} 
//                     alt="Profile" 
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-secondary flex items-center justify-center">
//                     <User className="w-16 h-16 text-muted-foreground" />
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105"
//               >
//                 <Camera className="w-5 h-5" />
//               </button>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 className="hidden"
//               />
//             </div>

//             {/* Profile Details */}
//             <div className="flex-1">
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <h2 className="text-2xl font-bold text-foreground">{profile?.fullName}</h2>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
//                   {profile?.role}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <Mail className="w-5 h-5 text-primary" />
//                   <span>{profile?.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <Phone className="w-5 h-5 text-primary" />
//                   <span>{profile?.phone || 'Not provided'}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <MapPin className="w-5 h-5 text-primary" />
//                   <span>
//                     {[profile?.city, profile?.state, profile?.country].filter(Boolean).join(', ') || 'Not provided'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <Shield className="w-5 h-5 text-primary" />
//                   <span>Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}</span>
//                 </div>
//               </div>

//               {/* Permissions for subadmin */}
//               {profile?.role === 'subadmin' && profile.permissions?.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-border">
//                   <h3 className="text-sm font-medium text-foreground mb-2">Permissions</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {profile.permissions.map((permission, index) => (
//                       <span
//                         key={index}
//                         className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
//                       >
//                         {permission}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Edit Profile Section */}
//         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.2s' }}>
//           <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//             <User className="w-5 h-5 text-primary" />
//             Edit Profile
//           </h3>

//           <form onSubmit={handleProfileUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.fullName}
//                   onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               {/* Email (Read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={profile?.email || ''}
//                   disabled
//                   className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-muted-foreground cursor-not-allowed"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={editForm.phone}
//                   onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your phone number"
//                 />
//               </div>

//               {/* Country */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.country}
//                   onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your country"
//                 />
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.state}
//                   onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your state"
//                 />
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.city}
//                   onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your city"
//                 />
//               </div>

//               {/* Pincode */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.pincode}
//                   onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
//                   className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                   placeholder="Enter your pincode"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={saving}
//               className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Save className="w-5 h-5" />
//               )}
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </form>
//         </section>

//         {/* Change Password Section */}
//         <section className="glass-card animate-slide-up mb-6" style={{ animationDelay: '0.3s' }}>
//           <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//             <Lock className="w-5 h-5 text-primary" />
//             Change Password
//           </h3>

//           <form onSubmit={handlePasswordChange} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Current Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Current Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showCurrentPassword ? 'text' : 'password'}
//                     value={passwordForm.currentPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
//                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* New Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? 'text' : 'password'}
//                     value={passwordForm.newPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
//                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                     required
//                     minLength={8}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm New Password */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Confirm New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={passwordForm.confirmNewPassword}
//                     onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
//                     className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     placeholder="••••••••"
//                     required
//                     minLength={8}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Password match indicator */}
//             {passwordForm.newPassword && passwordForm.confirmNewPassword && (
//               <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmNewPassword ? 'text-success' : 'text-destructive'}`}>
//                 {passwordForm.newPassword === passwordForm.confirmNewPassword ? (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     <span>Passwords match</span>
//                   </>
//                 ) : (
//                   <>
//                     <XCircle className="w-4 h-4" />
//                     <span>Passwords do not match</span>
//                   </>
//                 )}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={changingPassword || passwordForm.newPassword !== passwordForm.confirmNewPassword}
//               className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {changingPassword ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Lock className="w-5 h-5" />
//               )}
//               {changingPassword ? 'Updating...' : 'Update Password'}
//             </button>
//           </form>
//         </section>

//         {/* Delete Account Section */}
//         <section className="glass-card animate-slide-up border-destructive/30" style={{ animationDelay: '0.4s' }}>
//           <h3 className="text-xl font-semibold text-destructive mb-4 flex items-center gap-2">
//             <AlertTriangle className="w-5 h-5" />
//             Danger Zone
//           </h3>

//           <p className="text-muted-foreground mb-6">
//             Once you delete your account, there is no going back. Please be certain.
//           </p>

//           <button
//             onClick={() => setShowDeleteModal(true)}
//             className="flex items-center justify-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-all"
//           >
//             <Trash2 className="w-5 h-5" />
//             Delete Account
//           </button>
//         </section>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
//           <div className="glass-card max-w-md w-full animate-scale-in">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <AlertTriangle className="w-8 h-8 text-destructive" />
//               </div>
//               <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
//               <p className="text-muted-foreground mb-6">
//                 This action is irreversible. All your data will be permanently deleted.
//               </p>

//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   disabled={deleting}
//                   className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteAccount}
//                   disabled={deleting}
//                   className="flex items-center gap-2 px-6 py-2.5 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <Trash2 className="w-5 h-5" />
//                   )}
//                   {deleting ? 'Deleting...' : 'Yes, Delete'}
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
    
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Lock, 
  Trash2, 
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  Calendar,
  Edit3,
  X,
  XCircle
} from 'lucide-react';

// ✅ IMPORT API SERVICES
import { 
  getUserProfile, 
  updateUserProfile, 
  changeUserPassword, 
  deleteUserProfile 
} from '@/services/franchiseService';

// Types
interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'franchise' | 'dealer' | 'subadmin';
  permissions: string[];
  country: string;
  state: string;
  city: string;
  pincode: string;
  profileImage: string | null;
  createdAt: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Role badge color mapping
const roleBadgeStyles: Record<string, string> = {
  user: 'bg-secondary text-secondary-foreground',
  admin: 'bg-primary text-primary-foreground',
  franchise: 'bg-accent text-accent-foreground',
  dealer: 'bg-warning text-warning-foreground',
  subadmin: 'bg-success text-success-foreground',
};

const Profile: React.FC = () => {
  // State management
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Added for API upload
  const [isEditing, setIsEditing] = useState(false);
  
  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ API: Fetch Profile Logic
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getUserProfile();
      const data: UserProfile = res.data || res;

      setProfile(data);
      setEditForm({
        fullName: data.fullName || '',
        phone: data.phone || '',
        country: data.country || '',
        state: data.state || '',
        city: data.city || '',
        pincode: data.pincode || '',
      });
      setImagePreview(data.profileImage || null);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle profile image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file); // Set file for API
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // toast.success('Image selected');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle entering edit mode
  const handleStartEdit = () => {
    if (profile) {
      setEditForm({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        country: profile.country || '',
        state: profile.state || '',
        city: profile.city || '',
        pincode: profile.pincode || '',
      });
    }
    setIsEditing(true);
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setImagePreview(profile?.profileImage || null);
    setSelectedImage(null);
  };

  // ✅ API: Update Profile Logic
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const formData = new FormData();
      formData.append('fullName', editForm.fullName);
      formData.append('phone', editForm.phone);
      formData.append('country', editForm.country);
      formData.append('state', editForm.state);
      formData.append('city', editForm.city);
      formData.append('pincode', editForm.pincode);
      
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      const res = await updateUserProfile(formData);
      const updatedProfile = res.data || res;

      setProfile(updatedProfile);
      setSelectedImage(null);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // ✅ API: Password Change Logic
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!passwordForm.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }

    try {
      setChangingPassword(true);

      await changeUserPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  // ✅ API: Delete Account Logic
  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);

      await deleteUserProfile();

      setAccountDeleted(true);
      setShowDeleteModal(false);
      toast.success('Account deleted successfully');
      
      // Optional: Redirect to login/home after a delay
      setTimeout(() => {
        window.location.href = '/'; 
      }, 2000);
      
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to delete account');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card animate-fade-in flex flex-col items-center gap-4 p-8">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card animate-fade-in max-w-md w-full text-center p-8">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Profile</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Account deleted state
  if (accountDeleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card animate-scale-in max-w-md w-full text-center p-8">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Account Deleted</h2>
          <p className="text-muted-foreground">
            Your account has been permanently deleted. We're sorry to see you go.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="animate-fade-in mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Section - View/Edit Toggle */}
        <section className="glass-card animate-slide-up mb-6 overflow-hidden" style={{ animationDelay: '0.1s' }}>
          {/* Section Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </h3>
            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-all disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>

          <div className="p-6">
            {/* Profile Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
              {/* Profile Image */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Name & Role */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-foreground">{profile?.fullName}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${roleBadgeStyles[profile?.role || 'user']}`}>
                    {profile?.role}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                </p>
                
                {/* Permissions for subadmin */}
                {profile?.role === 'subadmin' && profile.permissions?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium capitalize"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transition container */}
            <div className={`transition-all duration-300 ease-in-out ${isEditing ? 'opacity-100' : 'opacity-100'}`}>
              {!isEditing ? (
                /* View Mode */
                <div className="space-y-6 animate-fade-in">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Mail className="w-5 h-5 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-foreground truncate">{profile?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="text-foreground">{profile?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
                    <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-foreground">
                          {[profile?.city, profile?.state].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {profile?.country} {profile?.pincode && `- ${profile.pincode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <form onSubmit={handleProfileUpdate} className="space-y-6 animate-fade-in">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <input
                          type="email"
                          value={profile?.email || ''}
                          disabled
                          className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-muted-foreground cursor-not-allowed"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                        <input
                          type="text"
                          value={editForm.country}
                          onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
                        <input
                          type="text"
                          value={editForm.state}
                          onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Pincode</label>
                        <input
                          type="text"
                          value={editForm.pincode}
                          onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                          className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Change Password Section */}
        <section className="glass-card animate-slide-up mb-6 overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Change Password
            </h3>
          </div>

          <form onSubmit={handlePasswordChange} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                    className="w-full px-4 py-2.5 pr-10 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password match indicator */}
            {passwordForm.newPassword && passwordForm.confirmNewPassword && (
              <div className={`flex items-center gap-2 text-sm mb-4 ${passwordForm.newPassword === passwordForm.confirmNewPassword ? 'text-success' : 'text-destructive'}`}>
                {passwordForm.newPassword === passwordForm.confirmNewPassword ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Passwords match
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Passwords do not match
                  </>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={changingPassword}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {changingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Delete Account Section */}
        <section className="glass-card animate-slide-up border border-destructive/20 overflow-hidden" style={{ animationDelay: '0.3s' }}>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </h3>
              <p className="text-muted-foreground text-sm">
                Once you delete your account, there is no going back.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all whitespace-nowrap text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteModal(false)}
          />
          <div className="glass-card animate-scale-in relative max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;