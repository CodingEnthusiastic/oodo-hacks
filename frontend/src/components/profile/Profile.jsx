import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import { updateProfile } from '../../store/slices/authSlice'
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.auth)
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(updateProfile(data)).unwrap()
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error(error || 'Failed to update profile')
    }
  }

  const handleCancel = () => {
    reset({
      name: user?.name || '',
      phone: user?.phone || ''
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Personal Information
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    disabled={!isEditing}
                    error={errors.name?.message}
                    {...register('name', {
                      required: 'Name is required'
                    })}
                  />
                  
                  <Input
                    label="Role"
                    disabled={true}
                    value={user?.role || 'Staff'}
                    readOnly
                  />
                </div>
                
                <Input
                  label="Email Address"
                  type="email"
                  disabled={true}
                  value={user?.email || ''}
                  readOnly
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  disabled={!isEditing}
                  error={errors.phone?.message}
                  {...register('phone', {
                    pattern: {
                      value: /^\+?[\d\s-()]+$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                
                <div className="flex justify-end space-x-3 pt-6">
                  {!isEditing ? (
                    <Button 
                      type="button" 
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={!isDirty || isLoading}
                        isLoading={isLoading}
                      >
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Card>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <Card>
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {user?.name || 'User'}
              </h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role || 'Staff'}</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Member since:</span>
                  <span className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last login:</span>
                  <span className="text-sm text-gray-900">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile