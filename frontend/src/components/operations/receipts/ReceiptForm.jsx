import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createReceipt, updateReceipt, fetchReceipt } from '../../../store/slices/receiptSlice'
import { fetchWarehouses } from '../../../store/slices/warehouseSlice'
import Card from '../../common/Card'
import Button from '../../common/Button'
import Input from '../../common/Input'
import Select from '../../common/Select'
import LoadingSpinner from '../../common/LoadingSpinner'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const ReceiptForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentReceipt, isCreating, isUpdating } = useSelector(state => state.receipts)
  const { items: warehouses } = useSelector(state => state.warehouses)
  const [locations, setLocations] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  
  const isEditing = Boolean(id)
  const isLoading = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [{ product: '', expectedQuantity: 0, unitPrice: 0 }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const watchedProducts = watch('products')
  const watchedWarehouse = watch('warehouse')

  // Fetch warehouses on mount
  useEffect(() => {
    dispatch(fetchWarehouses())
    
    if (isEditing && id) {
      dispatch(fetchReceipt(id))
    }
  }, [dispatch, id, isEditing])

  // Fetch locations when warehouse changes
  useEffect(() => {
    if (watchedWarehouse) {
      setSelectedWarehouse(watchedWarehouse)
      // Fetch locations for the selected warehouse from the warehouse object
      const selectedWh = warehouses?.find(w => w._id === watchedWarehouse)
      if (selectedWh) {
        // For now, create mock locations; in production, fetch from backend
        setLocations([
          { _id: watchedWarehouse + '_loc1', name: 'Storage' },
          { _id: watchedWarehouse + '_loc2', name: 'Receiving' },
          { _id: watchedWarehouse + '_loc3', name: 'Quality Check' }
        ])
      }
    }
  }, [watchedWarehouse, warehouses])

  useEffect(() => {
    if (isEditing && currentReceipt) {
      reset({
        reference: currentReceipt.reference,
        supplier: currentReceipt.supplier?.name || '',
        warehouse: currentReceipt.warehouse?._id || '',
        location: currentReceipt.location?._id || '',
        scheduledDate: currentReceipt.scheduledDate?.split('T')[0],
        notes: currentReceipt.notes,
        products: currentReceipt.products?.map(item => ({
          product: item.product?._id || item.product,
          expectedQuantity: item.expectedQuantity,
          unitPrice: item.unitPrice
        })) || []
      })
    }
  }, [currentReceipt, isEditing, reset])

  const calculateTotal = () => {
    return watchedProducts?.reduce((total, item) => {
      return total + (parseFloat(item.expectedQuantity || 0) * parseFloat(item.unitPrice || 0))
    }, 0) || 0
  }

  const onSubmit = async (data) => {
    try {
      // Validate at least one product exists
      if (!data.products || data.products.length === 0 || data.products.every(p => !p.product)) {
        toast.error('At least one product is required')
        return
      }

      const formattedData = {
        reference: data.reference,
        supplier: {
          name: data.supplier,
          email: data.supplierEmail || '',
          phone: data.supplierPhone || '',
          address: data.supplierAddress || ''
        },
        warehouse: data.warehouse,
        location: data.location,
        scheduledDate: data.scheduledDate,
        notes: data.notes,
        products: data.products.map(item => ({
          product: item.product,
          expectedQuantity: parseFloat(item.expectedQuantity),
          unitPrice: parseFloat(item.unitPrice)
        }))
      }

      if (isEditing) {
        await dispatch(updateReceipt({ id, data: formattedData })).unwrap()
        toast.success('Receipt updated successfully')
      } else {
        await dispatch(createReceipt(formattedData)).unwrap()
        toast.success('Receipt created successfully')
      }
      navigate('/dashboard')
    } catch (error) {
      toast.error(error || 'Something went wrong')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditing ? 'Edit Receipt' : 'New Receipt'}
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          {isEditing ? 'Update receipt information' : 'Create a new stock receipt'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Receipt Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Reference"
                required
                error={errors.reference?.message}
                {...register('reference', {
                  required: 'Reference is required'
                })}
              />

              <Input
                label="Supplier Name"
                required
                error={errors.supplier?.message}
                {...register('supplier', {
                  required: 'Supplier name is required'
                })}
              />

              <Input
                label="Supplier Email"
                type="email"
                error={errors.supplierEmail?.message}
                {...register('supplierEmail')}
              />

              <Input
                label="Supplier Phone"
                error={errors.supplierPhone?.message}
                {...register('supplierPhone')}
              />

              <Select
                label="Warehouse"
                required
                error={errors.warehouse?.message}
                {...register('warehouse', {
                  required: 'Warehouse is required'
                })}
              >
                <option value="">Select warehouse</option>
                {Array.isArray(warehouses) && warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Location"
                required
                error={errors.location?.message}
                {...register('location', {
                  required: 'Location is required'
                })}
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </Select>

              <Input
                label="Scheduled Date"
                type="date"
                required
                error={errors.scheduledDate?.message}
                {...register('scheduledDate', {
                  required: 'Scheduled date is required'
                })}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Address
              </label>
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                rows={2}
                {...register('supplierAddress')}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                rows={3}
                {...register('notes')}
              />
            </div>
          </div>
        </Card>

        {/* Items */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Products
              </h3>
              <Button
                type="button"
                variant="outline"
                icon={PlusIcon}
                onClick={() => append({ product: '', expectedQuantity: 0, unitPrice: 0 })}
              >
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border border-gray-200 rounded-lg">
                  <Input
                    label="Product Name"
                    required
                    error={errors.products?.[index]?.product?.message}
                    {...register(`products.${index}.product`, {
                      required: 'Product is required'
                    })}
                  />

                  <Input
                    label="Expected Quantity"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    error={errors.products?.[index]?.expectedQuantity?.message}
                    {...register(`products.${index}.expectedQuantity`, {
                      required: 'Quantity is required'
                    })}
                  />

                  <Input
                    label="Unit Price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    error={errors.products?.[index]?.unitPrice?.message}
                    {...register(`products.${index}.unitPrice`, {
                      required: 'Unit price is required'
                    })}
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Total: ${((watchedProducts?.[index]?.expectedQuantity || 0) * (watchedProducts?.[index]?.unitPrice || 0)).toFixed(2)}
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        icon={TrashIcon}
                        onClick={() => remove(index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <div className="text-lg font-semibold text-gray-900">
                Grand Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/operations/receipts')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isEditing ? 'Update Receipt' : 'Create Receipt'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReceiptForm