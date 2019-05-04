-- SET @j = '{"a": "asdf", "b": {"b": [1, 2]}, "c":[3, 4]}';
-- SELECT JSON_EXTRACT(@j, '$.b[0].b[0]');
-- SELECT JSON_VALID( @j );

-- SELECT JSON_ARRAY_INSERT(@j, '$[1]', 'x');

SET @j = '["a", {"b": [1, 2]}, [3, 4]]';
-- SELECT JSON_ARRAY_INSERT(@j, '$[1]', 'x');
SELECT JSON_EXTRACT(@j, '$[1].b[0]');


