/* ═══════════════════════════════════════════════════════════════════════
 * WISTRON — Trilingual labels (EN / ES / VI)
 * Same pattern as the Salcomp translations.js. Page sets
 * window.applyTranslations(lang) on language change.
 * ═══════════════════════════════════════════════════════════════════════ */
window.WISTRON_T = {
  'app.title':            { en: 'Wistron Automation Team',     es: 'Equipo de Automatización Wistron', vi: 'Đội Tự Động Hóa Wistron' },
  'app.subtitle':         { en: 'Parts Inventory System',       es: 'Sistema de Inventario de Piezas',  vi: 'Hệ Thống Kho Phụ Tùng' },
  'home.tap':             { en: 'Tap an area to view machines', es: 'Toca un área para ver máquinas',   vi: 'Chạm vào khu vực để xem máy' },

  'area.dip':             { en: 'DIP Line',           es: 'Línea DIP',           vi: 'Dây Chuyền DIP' },
  'area.line1':           { en: 'Line 1',             es: 'Línea 1',             vi: 'Dây Chuyền 1' },
  'area.line2':           { en: 'Line 2',             es: 'Línea 2',             vi: 'Dây Chuyền 2' },
  'area.pods':            { en: 'PODS',               es: 'PODS',                vi: 'PODS' },
  'area.line4':           { en: 'Line 4',             es: 'Línea 4',             vi: 'Dây Chuyền 4' },
  'area.packout':         { en: 'Pack Out',           es: 'Empaque',             vi: 'Đóng Gói' },

  'machine.list':         { en: 'Machines',           es: 'Máquinas',            vi: 'Máy Móc' },
  'machine.tap':          { en: 'Tap a machine to view its parts', es: 'Toca una máquina para ver sus piezas', vi: 'Chạm vào máy để xem phụ tùng' },
  'machine.no_machines':  { en: 'No machines configured for this area yet.', es: 'No hay máquinas configuradas en esta área aún.', vi: 'Chưa có máy nào được cấu hình cho khu vực này.' },

  'parts.title':          { en: 'Parts on this machine', es: 'Piezas en esta máquina', vi: 'Phụ tùng trên máy này' },
  'parts.qty':            { en: 'Qty',                es: 'Cantidad',            vi: 'SL' },
  'parts.notes':          { en: 'Notes',              es: 'Notas',               vi: 'Ghi chú' },
  'parts.photo':          { en: 'Photo',              es: 'Foto',                vi: 'Ảnh' },
  'parts.add':            { en: '+ Add part to this machine', es: '+ Añadir pieza a esta máquina', vi: '+ Thêm phụ tùng vào máy này' },
  'parts.none':           { en: 'No parts assigned to this machine yet.', es: 'No hay piezas asignadas a esta máquina aún.', vi: 'Chưa có phụ tùng nào được gán cho máy này.' },
  'parts.save':           { en: 'Save',               es: 'Guardar',             vi: 'Lưu' },
  'parts.cancel':         { en: 'Cancel',             es: 'Cancelar',            vi: 'Hủy' },
  'parts.remove':         { en: 'Remove',             es: 'Eliminar',            vi: 'Xóa' },
  'parts.upload_photo':   { en: 'Upload photo',       es: 'Subir foto',          vi: 'Tải ảnh lên' },
  'parts.reorder':        { en: 'Reorder at',         es: 'Reordenar a',         vi: 'Đặt lại khi' },
  'parts.low':            { en: 'LOW STOCK',          es: 'BAJO STOCK',          vi: 'SẮP HẾT' },
  'parts.adjust_up':      { en: 'Restock (+)',        es: 'Reponer (+)',         vi: 'Bổ sung (+)' },
  'parts.adjust_down':    { en: 'Used (−)',           es: 'Usado (−)',           vi: 'Đã dùng (−)' },
  'parts.adjust_amount':  { en: 'Amount',             es: 'Cantidad',            vi: 'Số lượng' },
  'parts.adjust_reason':  { en: 'Reason (optional)',  es: 'Motivo (opcional)',   vi: 'Lý do (tùy chọn)' },
  'parts.your_name':      { en: 'Your name',          es: 'Tu nombre',           vi: 'Tên của bạn' },

  'master.title':         { en: 'Parts Master Catalog', es: 'Catálogo Maestro de Piezas', vi: 'Danh Mục Phụ Tùng Gốc' },
  'master.subtitle':      { en: 'Engineer-only. Add new part types here before they can be assigned to machines.', es: 'Solo ingenieros. Agregue nuevos tipos de piezas aquí antes de asignarlas a máquinas.', vi: 'Chỉ kỹ sư. Thêm loại phụ tùng mới ở đây trước khi gán cho máy.' },
  'master.add':           { en: '+ Add new part type', es: '+ Añadir nuevo tipo de pieza', vi: '+ Thêm loại phụ tùng mới' },
  'master.name':          { en: 'Part name',          es: 'Nombre',              vi: 'Tên phụ tùng' },
  'master.part_number':   { en: 'Part number (optional)', es: 'Número de pieza (opcional)', vi: 'Số phụ tùng (tùy chọn)' },
  'master.description':   { en: 'Description (optional)', es: 'Descripción (opcional)', vi: 'Mô tả (tùy chọn)' },
  'master.locked':        { en: '🔒 Locked · enter password to manage', es: '🔒 Bloqueado · ingrese contraseña', vi: '🔒 Đã khóa · nhập mật khẩu' },
  'master.unlocked':      { en: '🔓 Unlocked · click to lock', es: '🔓 Desbloqueado · clic para bloquear', vi: '🔓 Mở khóa · nhấp để khóa' },
  'master.password_prompt': { en: 'Enter password to manage parts master:', es: 'Ingrese contraseña para gestionar catálogo:', vi: 'Nhập mật khẩu để quản lý:' },
  'master.wrong_password': { en: 'Wrong password.', es: 'Contraseña incorrecta.', vi: 'Mật khẩu sai.' },

  'common.home':          { en: 'Home',               es: 'Inicio',              vi: 'Trang Chủ' },
  'common.back':          { en: 'Back',               es: 'Atrás',               vi: 'Quay Lại' },
  'common.loading':       { en: 'Loading…',           es: 'Cargando…',           vi: 'Đang tải…' },
  'common.error':         { en: 'Error',              es: 'Error',               vi: 'Lỗi' },
};

window.applyTranslations = function(lang){
  lang = lang || 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    const entry = window.WISTRON_T[k];
    if(entry && entry[lang]) el.textContent = entry[lang];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.getAttribute('data-i18n-placeholder');
    const entry = window.WISTRON_T[k];
    if(entry && entry[lang]) el.setAttribute('placeholder', entry[lang]);
  });
  try { localStorage.setItem('wistron_lang', lang); } catch(e){}
  document.documentElement.setAttribute('lang', lang);
};

window.getCurrentLang = function(){
  try { return localStorage.getItem('wistron_lang') || 'en'; } catch(e){ return 'en'; }
};

window.cycleLang = function(){
  const order = ['en','es','vi'];
  const cur = window.getCurrentLang();
  const next = order[(order.indexOf(cur) + 1) % order.length];
  window.applyTranslations(next);
  const btn = document.getElementById('langBtn');
  if(btn) btn.textContent = next.toUpperCase();
};

document.addEventListener('DOMContentLoaded', () => {
  window.applyTranslations(window.getCurrentLang());
  const btn = document.getElementById('langBtn');
  if(btn) btn.textContent = window.getCurrentLang().toUpperCase();
});
