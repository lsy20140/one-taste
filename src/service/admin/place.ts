import executeQuery from "@/lib/db";

export async function getAllPlaces() {
  const query = `
    SELECT 
      p.place_id,
      p.name,
      p.address,
      p.content,
      p.opening_hours,
      p.closed_days,
      p.phone,
      cate.cate_name 
    FROM
      place as p
    JOIN category as cate 
      ON cate.cate_id = p.cate_id
  `;
  const res = await executeQuery(query);
  return res;
}
