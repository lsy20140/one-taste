import { authOptions } from "@/lib/authOptions"
import executeQuery from "@/lib/db"
import { getServerSession } from "next-auth"

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

export async function getDetailPlaceInfo(id: Number) {
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
      COALESCE(c.comments, null) as comments,
      COALESCE(i.images, null) as images,
      cate.cate_name 
    FROM 
      place as p
    LEFT JOIN 
      (SELECT 
        rest_id, 
        JSON_ARRAYAGG(dibs.user_id) as dibs
        FROM dibs group by rest_id
      ) as d ON d.rest_id = p.place_id
    LEFT JOIN
      (SELECT 
        rest_id, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'user_id', comment.user_id,
            'content', comment.content,
            'created_date', comment.created_date
          )
        ) as comments 
        FROM comment group by rest_id
      ) as c ON c.rest_id = p.place_id
    JOIN category as cate 
      ON cate.cate_id = p.cate_id
    LEFT JOIN (SELECT rest_id, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'image_id', image.image_id, 
          'image_url', image.image_url,
          'created_date', image.created_date,
          'user_id', image.user_id
        )
      )
      as images FROM image GROUP BY rest_id) as i
      on i.rest_id = p.place_id
    WHERE place_id = ${id}
  `
  const res = await executeQuery(query)
  return res
}

type Props = {
  id: Number | string,
  url: string
}
export async function addPlaceImage({id, url}: Props) {
  console.log("pathpath", url)
  const session = await getServerSession(authOptions)
  const userId = session?.user.user_id
  const date = new Date()

  const query=
  `INSERT INTO image (image_id,rest_id, image_url, created_date, user_id ) values(?, ?, ?, ?, ?)`

  const res = await executeQuery(query,[null, id, url, date, userId])
  return res
}

export async function getAutocompletePlaces(keyword: string) {
  const query = 
  `
    SELECT * FROM place
    WHERE name LIKE "%${keyword}%" or content LIKE "%${keyword}%"
  `

  const res = await executeQuery(query)
  return res
}