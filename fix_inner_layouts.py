import re

def rewrite_auth():
    with open('app/auth/page.tsx', 'r') as f:
        content = f.read()
    
    # <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
    content = content.replace(
        '<main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">',
        '<main className="min-h-screen bg-background font-sans relative overflow-hidden">'
    )
    # <div className="relative z-10 flex flex-col items-center justify-start pt-24 min-h-screen px-4 sm:px-6 lg:px-8 pb-12">
    content = content.replace(
        'pt-24',
        'pt-36 sm:pt-44'
    )
    
    with open('app/auth/page.tsx', 'w') as f:
        f.write(content)

def rewrite_orders():
    with open('app/orders/page.tsx', 'r') as f:
        content = f.read()
    
    # <main className="min-h-screen bg-slate-50 font-sans pb-24">
    content = content.replace(
        '<main className="min-h-screen bg-slate-50 font-sans pb-24">',
        '<main className="min-h-screen bg-background font-sans pb-24">'
    )
    # <div className="pt-28 sm:pt-32 pb-8 bg-white border-b border-slate-200">
    content = re.sub(
        r'<div className="pt-28 sm:pt-32 pb-8 bg-white border-b border-slate-200">',
        '<div className="pt-36 sm:pt-44 pb-8 bg-surface-container border-b border-outline-variant/30">',
        content
    )
    
    with open('app/orders/page.tsx', 'w') as f:
        f.write(content)

def rewrite_order_id():
    with open('app/order/[id]/page.tsx', 'r') as f:
        content = f.read()
        
    content = content.replace(
        '<main className="min-h-screen bg-slate-50 font-sans pb-24">',
        '<main className="min-h-screen bg-background font-sans pb-24">'
    )
    
    content = re.sub(
        r'<div className="pt-28 sm:pt-32 pb-8 bg-white border-b border-slate-200">',
        '<div className="pt-36 sm:pt-44 pb-8 bg-surface-container border-b border-outline-variant/30">',
        content
    )

    with open('app/order/[id]/page.tsx', 'w') as f:
        f.write(content)

def rewrite_product_id():
    with open('app/product/[id]/page.tsx', 'r') as f:
        content = f.read()
        
    content = content.replace(
        '<main className="min-h-screen bg-slate-50 font-sans">',
        '<main className="min-h-screen bg-background font-sans">'
    )
    content = content.replace(
        '<div className="pt-28 sm:pt-32 pb-16">',
        '<div className="pt-36 sm:pt-44 pb-16">'
    )
    with open('app/product/[id]/page.tsx', 'w') as f:
        f.write(content)


rewrite_auth()
rewrite_orders()
rewrite_order_id()
rewrite_product_id()

print("Inner layouts replaced.")
