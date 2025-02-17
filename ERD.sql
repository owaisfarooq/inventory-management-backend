Table user {
  id integer [primary key]
  name varchar
  email varchar [unique]
  password_hash varchar
  role_id integer
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table role {
  id integer [primary key]
  role_name varchar [unique]
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table permission {
  id integer [primary key]
  feature_name varchar
  action_type varchar
}

Table role_permission {
  id integer [primary key]
  role_id integer
  permission_id integer
}

Table product {
  id integer [primary key]
  name varchar
  sku varchar [unique]
  category_id integer
  min_stock_threshold integer
  cost_price decimal
  selling_price decimal
  unit varchar
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table product_batch {
  id integer [primary key]
  product_id integer
  supplier_id integer
  batch_number varchar [unique]
  expiry_date date
  quantity integer
  received_date timestamp
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table category {
  id integer [primary key]
  name varchar [unique]
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table product_supplier {
  id integer [primary key]
  product_id integer
  supplier_id integer
  priority integer
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table supplier {
  id integer [primary key]
  name varchar
  contact_email varchar
  contact_phone varchar
  address text
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table purchase_order {
  id integer [primary key]
  supplier_id integer
  status varchar
  total_cost decimal
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table purchase_order_item {
  id integer [primary key]
  purchase_order_id integer
  product_id integer
  quantity_requested integer
  quantity_received integer
  unit_price decimal
  created_at timestamp
  edited_at timestamp
}

Table customer {
  id integer [primary key]
  name varchar
  email varchar
  phone varchar
  address text
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table sale_order {
  id integer [primary key]
  customer_id integer
  status varchar
  total_price decimal
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table sale_order_item {
  id integer [primary key]
  sale_order_id integer
  product_id integer
  batch_id integer
  quantity integer
  unit_price decimal
  created_at timestamp
  edited_at timestamp
}

Table return_order {
  id integer [primary key]
  sales_order_id integer
  customer_id integer
  return_date timestamp
  status varchar
  total_refund decimal
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Table return_order_item {
  id integer [primary key]
  return_order_id integer
  product_id integer
  batch_id integer
  quantity integer
  return_reason varchar
  refund_amount decimal
  restock boolean
  created_at timestamp
  edited_at timestamp
}

Table stock_movement {
  id integer [primary key]
  product_id integer
  batch_id integer
  supplier_id integer
  quantity_change integer
  movement_type varchar
  reference_id integer
  created_by integer
  created_at timestamp
  edited_by integer
  edited_at timestamp
  deleted_by integer
  deleted_at timestamp
}

Ref: user.role_id > role.id
Ref: role_permission.role_id > role.id
Ref: role_permission.permission_id > permission.id
Ref: product.category_id > category.id
Ref: product_supplier.product_id > product.id
Ref: product_supplier.supplier_id > supplier.id
Ref: product_batch.product_id > product.id
Ref: product_batch.supplier_id > supplier.id
Ref: purchase_order.supplier_id > supplier.id
Ref: purchase_order_item.purchase_order_id > purchase_order.id
Ref: purchase_order_item.product_id > product.id
Ref: sale_order.customer_id > customer.id
Ref: sale_order_item.sale_order_id > sale_order.id
Ref: sale_order_item.product_id > product.id
Ref: sale_order_item.batch_id > product_batch.id
Ref: return_order.sales_order_id > sale_order.id
Ref: return_order.customer_id > customer.id
Ref: return_order_item.return_order_id > return_order.id
Ref: return_order_item.product_id > product.id
Ref: return_order_item.batch_id > product_batch.id
Ref: stock_movement.product_id > product.id
Ref: stock_movement.batch_id > product_batch.id
Ref: stock_movement.supplier_id > supplier.id
