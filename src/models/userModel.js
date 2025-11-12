// ตัวอย่าง Model สำหรับ query DB (จะเชื่อมจริงทีหลัง)
export const createUser = async (connection, data) => {
  const sql = `
    INSERT INTO User (name, email, password, role, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const [result] = await connection.execute(sql, [
    data.name,
    data.email,
    data.password,
    data.role || "user",
  ]);
  return result;
};
