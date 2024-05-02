import executeQuery from "@/lib/db"

// 검색창에 입력 시 입력한 키워드가 식당 이름 또는 설명에 포함된 식당 목록
export async function getAutocompletePlaces(keyword: string) {
  const query = 
  `
    SELECT * FROM place
    WHERE name LIKE "%${keyword}%" or content LIKE "%${keyword}%"
  `

  const res = await executeQuery(query)
  return res
}

// 검색창에 입력 후 submit 한 경우 해당 키워드가 식당 이름 또는 설명에 포함된 식당 목록 및 식당에 대한 요약 정보
export async function getSearchPlaces(keyword: string) {
  const query = 
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
    WHERE name LIKE "%${keyword}%" or content LIKE "%${keyword}%"
  `
  const res = await executeQuery(query)
  return res
}