"use client"

import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import { Plus, Trash2, Edit2, Check } from "lucide-react"

interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

const DeliveryAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formState, setFormState] = useState<Omit<Address, "id">>({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  })

  // derive userId once
  const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}").id : null

  // Fetch on mount
  useEffect(() => {
    if (!userId) return
    fetch(`/api/user/${userId}/addresses`)
      .then((res) => res.json())
      .then(setAddresses)
      .catch(console.error)
  }, [userId])

  // Add or Update address
  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userId) return

    const url = editingId ? `/api/user/${userId}/addresses/${editingId}` : `/api/user/${userId}/addresses`
    const method = editingId ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    })
    if (res.ok) {
      const updated = await res.json()
      setAddresses(updated)
      setShowAddForm(false)
      setEditingId(null)
      setFormState({ name: "", street: "", city: "", state: "", zipCode: "", isDefault: false })
    }
  }

  // Delete address
  const handleDelete = async (id: string) => {
    if (!userId) return
    const res = await fetch(`/api/user/${userId}/addresses/${id}`, { method: "DELETE" })
    if (res.ok) setAddresses(await res.json())
  }

  // Enter edit mode
  const startEdit = (addr: Address) => {
    setEditingId(addr.id)
    setFormState({
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      isDefault: addr.isDefault,
    })
    setShowAddForm(true)
  }

  // Set default locally & optionally call your API if you persist that server-side
  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Delivery Addresses</h2>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingId(null)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 border rounded-lg ${addr.isDefault ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{addr.name}</h3>
                  {addr.isDefault && (
                    <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">Default</span>
                  )}
                </div>
                <p className="text-gray-600">{addr.street}</p>
                <p className="text-gray-600">
                  {addr.city}, {addr.state} {addr.zipCode}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)} className="text-blue-600">
                    Set Default
                  </button>
                )}
                <button onClick={() => startEdit(addr)} className="p-2 text-gray-500">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(addr.id)} className="p-2 text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              {["name", "street", "city", "state", "zipCode"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={(formState as any)[field]}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formState.isDefault}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
                <label>Set as default</label>
              </div>
              <div className="flex gap-2 mt-6">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {editingId ? <Check size={18} /> : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingId(null)
                  }}
                  className="flex-1 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeliveryAddress
