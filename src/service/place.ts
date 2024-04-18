import executeQuery from "@/lib/db"

export async function getAllPlaces() {
  const query = 'SELECT * FROM place'
  const res = await executeQuery(query)
  return res
}

export async function getSimplePlaceInfo(id: Number) {
  const query= 
  `
    SELECT 
      p.place_id,
      p.name, 
      p.address, 
      p.content, 
      p.opening_hours, 
      p.closed_days, 
      p.phone, 
      COALESCE(d.dibs, null) as dibs_list,
      cate.cate_name 
    FROM 
      place as p
    LEFT JOIN 
      (SELECT 
        rest_id, 
        JSON_ARRAYAGG(dibs.user_id) as dibs
        FROM dibs group by rest_id
      ) as d ON d.rest_id = p.place_id
    JOIN category as cate 
      ON cate.cate_id = p.cate_id
    WHERE place_id = ${id}
  `
  const res = await executeQuery(query)
  return res
}