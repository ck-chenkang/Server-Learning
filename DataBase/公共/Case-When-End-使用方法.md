# case when end 的使用方法

示例如下：
```sql
SELECT
	CASE			
		WHEN
			p.MachineName = '定形机A5' THEN
				'5号机' 
				WHEN p.MachineName = '定形机A4' THEN
				'4号机' 
				WHEN p.MachineName = '定形机A3' THEN
				'3号机' 
				WHEN p.MachineName = '定形机A2' THEN
				'2号机' 
				WHEN p.MachineName = '定形机A1' THEN
				'1号机' 
			END AS MachineName,
			p.OrderName,
			p.GX,
			COALESCE ( n.Number, 0 ) Number 
		FROM
			Production p
			LEFT JOIN Number n ON n.OrderName = p.OrderName 
		WHERE
			p.OrderState != 1 
			AND Number < 4 
		ORDER BY
		MachineName,
		Number
```