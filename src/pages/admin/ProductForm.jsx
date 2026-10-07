import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Upload,
  Image,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Camera,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { productService } from "../../services/productService";
import "./ProductForm.css";

const DEFAULT_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80";

export const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const fileInputRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    category: "Jewellery",
    subCategory: "",
    price: "",
    description: "",
    imageUrl: "",
    inStock: true,
    isActive: true,
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load product if editing
  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const { data, error } = await productService.getProductById(id);
          if (error || !data) {
            setErrorMsg("Could not load product to edit.");
          } else {
            setFormData({
              name: data.name || "",
              category: data.category || "Jewellery",
              subCategory: data.subCategory || "",
              price: data.price !== null && data.price !== undefined ? String(data.price) : "",
              description: data.description || "",
              imageUrl: data.imageUrl || "",
              inStock: data.inStock ?? true,
              isActive: data.isActive ?? true,
              featured: data.featured ?? false,
            });
            setImagePreview(data.imageUrl || "");
          }
        } catch (err) {
          setErrorMsg("Error fetching product data.");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle local mobile/desktop file pick
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Product Name is required.");
      return;
    }

    setSaving(true);

    try {
      let finalImageUrl = formData.imageUrl.trim();

      // If user uploaded a new image file from mobile/desktop
      if (imageFile) {
        const uploadResult = await productService.uploadProductImage(imageFile);
        if (uploadResult.url) {
          finalImageUrl = uploadResult.url;
        } else {
          console.warn("Upload warning:", uploadResult.error);
        }
      }

      // Default image if none provided
      if (!finalImageUrl) {
        finalImageUrl = DEFAULT_IMAGE_PLACEHOLDER;
      }

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        subCategory: formData.subCategory.trim(),
        price: formData.price ? Number(formData.price) : null,
        description: formData.description.trim(),
        imageUrl: finalImageUrl,
        inStock: Boolean(formData.inStock),
        isActive: Boolean(formData.isActive),
        featured: Boolean(formData.featured),
      };

      if (isEditing) {
        const { error } = await productService.updateProduct(id, payload);
        if (error) throw new Error(error);
        setSuccessMsg("Product updated successfully! Redirecting...");
      } else {
        const { error } = await productService.createProduct(payload);
        if (error) throw new Error(error);
        setSuccessMsg("Product added to catalog successfully! Redirecting...");
      }

      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || "Failed to save product.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Loading Product...">
        <div className="product-form-card text-center" style={{ padding: "3rem" }}>
          <p>Loading product details...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditing ? "Edit Product" : "Add New Product"}
      subtitle={
        isEditing
          ? `Updating details for "${formData.name || "Product"}"`
          : "Add a new item to your online showcase and WhatsApp ordering catalog"
      }
    >
      <div className="form-page-container">
        <div className="back-link-row">
          <Link to="/admin/products" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Products List</span>
          </Link>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="form-alert error-alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="form-alert success-alert">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-admin-form">
          <div className="form-columns-layout">
            {/* Left Column: Core Fields */}
            <div className="form-main-col">
              <div className="form-card">
                <h3 className="form-card-title">Product Details</h3>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Product Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Royal Kundan & Pearl Bridal Choker Set"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Category & Subcategory */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Category <span className="required-star">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Jewellery">Imitation Jewellery</option>
                      <option value="Cosmetics">Cosmetics & Beauty</option>
                      <option value="Bags">Bags & Clutches</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subCategory" className="form-label">
                      Sub-Category / Type
                    </label>
                    <input
                      id="subCategory"
                      name="subCategory"
                      type="text"
                      placeholder="e.g. Necklace Sets, Jhumkas, Potli"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price in INR (₹) - <em>Optional</em>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 1499 (Leave blank for 'Enquire for Price')"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <span className="form-helper-text">
                    If left blank, the customer will see "Enquire for Price" and can ask on WhatsApp.
                  </span>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description & Specifications
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Describe stone type, plating finish, occasion, color, compartments..."
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                </div>
              </div>

              {/* Status and Visibility Settings */}
              <div className="form-card">
                <h3 className="form-card-title">Catalog Visibility & Stock</h3>

                <div className="toggles-list">
                  {/* Active Toggle */}
                  <label className="toggle-item-row" htmlFor="isActive">
                    <div className="toggle-text">
                      <strong>Published on Website (Active)</strong>
                      <span>When enabled, customers can view this product in your store catalog.</span>
                    </div>
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="toggle-checkbox"
                    />
                  </label>

                  {/* Stock Toggle */}
                  <label className="toggle-item-row" htmlFor="inStock">
                    <div className="toggle-text">
                      <strong>Currently In Stock</strong>
                      <span>Shows "In Stock" badge. When unchecked, displays "Made to Order".</span>
                    </div>
                    <input
                      id="inStock"
                      name="inStock"
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="toggle-checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Image Upload & Preview */}
            <div className="form-side-col">
              <div className="form-card">
                <h3 className="form-card-title">Product Image</h3>
                <p className="form-helper-text mb-3">
                  Upload a photo from your phone's camera, gallery, or paste a link.
                </p>

                {/* Image Preview Area */}
                <div className="image-preview-box">
                  {imagePreview ? (
                    <div className="preview-container">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="preview-img"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="remove-preview-btn"
                        title="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-dropzone"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={36} className="text-gold" />
                      <strong>Upload from Phone / Gallery</strong>
                      <span>Tap here to select an image</span>
                    </div>
                  )}
                </div>

                {/* Mobile / File Picker button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <div className="upload-buttons-group">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-secondary btn-full btn-sm"
                  >
                    <Upload size={15} />
                    <span>{imagePreview ? "Change Photo" : "Choose Photo (File / Camera)"}</span>
                  </button>
                </div>

                <div className="image-or-divider">
                  <span>OR PASTE IMAGE URL</span>
                </div>

                {/* Direct URL Input */}
                <div className="form-group">
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://.../photo.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => {
                      handleChange(e);
                      if (!imageFile) setImagePreview(e.target.value);
                    }}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-card submit-card">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary btn-full btn-lg form-save-btn"
                >
                  <Save size={18} />
                  <span>
                    {saving
                      ? "Saving Product..."
                      : isEditing
                      ? "Save Changes"
                      : "Publish Product to Catalog"}
                  </span>
                </button>

                <Link
                  to="/admin/products"
                  className="btn btn-secondary btn-full btn-sm mt-2"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
