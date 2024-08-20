export function generateInitials(fullName) {
  // ตรวจสอบว่า fullName เป็นสตริงและไม่ว่างเปล่า
  if (typeof fullName !== 'string' || fullName.trim() === '') {
    return ''; // คืนค่าว่างหาก fullName ไม่ถูกต้อง
  }

  // แบ่งชื่อเต็มออกเป็นอาร์เรย์ของคำ
  const words = fullName.split(/\s+/);

  // ดึงตัวอักษรแรกของแต่ละคำแล้วเชื่อมเข้าด้วยกัน
  const initials = words.map((word) => word.charAt(0)).join("");

  // ทำให้ตัวอักษรย่อเป็นตัวพิมพ์ใหญ่ทั้งหมด
  return initials.toUpperCase();
}