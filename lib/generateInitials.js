export function generateInitials(fullName) {
    // แบ่งชื่อเต็มออกเป็นอาร์เรย์ของคำ
    const words = fullName.split(/\s+/);
  
    // ดึงตัวอักษรแรกของแต่ละคำแล้วเชื่อมเข้าด้วยกัน
    const initials = words.map((word) => word.charAt(0)).join("");
  
    // ทำให้ตัวอักษรย่อเป็นตัวพิมพ์ใหญ่ทั้งหมด
    return initials.toUpperCase();
  }
  
  // การใช้งานตัวอย่าง:
//   const fullName = "Muke Johbpatist";
//   const initials = generateInitials(fullName);
//   console.log(initials); // ผลลัพธ์: "MJ"
  