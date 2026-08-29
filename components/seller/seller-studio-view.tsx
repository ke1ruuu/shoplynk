"use client";

import React, { useState } from "react";
import { SellerHeader, SellerStoreData } from "./seller-header";
import { SellerStats } from "./seller-stats";
import { ProductTable, SellerProductItem } from "./product-table";
import { ProductFormModal, CategoryOption, ProductToEdit } from "./product-form-modal";
import { DeleteProductDialog } from "./delete-product-dialog";

interface SellerStudioViewProps {
  store: SellerStoreData;
  categories: CategoryOption[];
  products: SellerProductItem[];
}

export function SellerStudioView({
  store,
  categories,
  products,
}: SellerStudioViewProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductToEdit | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  function handleAddNew() {
    setProductToEdit(null);
    setFormOpen(true);
  }

  function handleEditProduct(product: ProductToEdit) {
    setProductToEdit(product);
    setFormOpen(true);
  }

  function handleDeleteProduct(product: { id: string; title: string }) {
    setProductToDelete(product);
    setDeleteOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* 1. Storefront Studio Header */}
      <SellerHeader store={store} onAddProduct={handleAddNew} />

      {/* 2. Inventory & Product Metrics */}
      <SellerStats products={products} />

      {/* 3. Product Management Data Table */}
      <ProductTable
        products={products}
        categories={categories}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddNew={handleAddNew}
      />

      {/* 4. Product Add / Edit Modal */}
      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        categories={categories}
        productToEdit={productToEdit}
      />

      {/* 5. Delete Product Confirmation Dialog */}
      <DeleteProductDialog
        product={productToDelete}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
