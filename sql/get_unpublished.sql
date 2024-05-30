select n.id , n.title , n.url  , ns."name"  , ni.url  from "News" n 
left join "Post" p on p."newId" = n.id 
left join "NewsImage" ni on ni."newsId" = n.id 
left join "NewsSource" ns on ns.id = n."sourceId" 
where p.id is null;