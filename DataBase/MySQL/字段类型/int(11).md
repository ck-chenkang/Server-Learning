# int(11)代表什么

一句话总结：11不带表存储数据的长度，也不代表最大值和最小值的限制。

<font style="background-color: yellow">11指的是存储宽度，不表示存储长度。</font>如果列制定了zerofill 就会用0填充显示，例如int(11)指定后2就会显示为000000000002，自动左边补零。

参考链接：

[WHAT DOES INT(11) MEANS IN MYSQL?](https://nexladder.com/blog/what-does-int11-means-in-mysql/)

In this article, we’ll see about what does `int(11)` means in MySQL. most of the developer think that int(11) means in MySQL is that the int column can store maximum integer value with 11 digits in length. However, this is not true. in int(11), 11 is the **display width** of the integer column, unlike the characters columns where the number means number of character that can be stored.

`int(11)` – The number in the parenthesis i.e **()** does not determines the max and min values that can be stored in the integer field. The max and min values that can be stored are always fixed. It is just **display width** of integer data type.

The number in the bracket in **int(N)** is often confused by the maximum size allowed for the column, as it does in the case of **varchar(N)**.

But this is not the case with Integer data types- the number N in the bracket is not the maximum size for the column, but simply a parameter to tell MySQL what width to display the column at when the table’s data is being viewed via the MySQL console (when you’re using the ZEROFILL attribute).

Below the required storage and range for each integer type.

An INT will always be 4 bytes no matter what length is specified.

- **TINYINT** = 1 byte (8 bit)
- **SMALLINT** = 2 bytes (16 bit)
- **MEDIUMINT** = 3 bytes (24 bit)
- **INT** = 4 bytes (32 bit)
- **BIGINT** = 8 bytes (64 bit)

Above, We’ve seen that MySQL integer **int(11)** has size is **4** bytes which equals **32 bit**.

**Signed value is** : `-2^(32-1) to 0 to 2^(32-1)-1` = `-2147483648 to 0 to 2147483647`. One bit is for sign.

**Unsigned values is** : `0 to 2^32-1` = `0 to 4294967295`

INT(num) will make difference only in term of display, that is to show in the number in ‘num’ digits, and not restricted only to 11. You pair it using ZEROFILL, which will prepend the zeros until it matches your length.

Remarks :

if the value has less digit than ‘num’, **ZEROFILL** will prepend zeros.

- INT(5) ZEROFILL with the stored value of 32 will show 00032
- INT(5) with the stored value of 32 will show 32
- INT with the stored value of 32 will show 32

if the value has more digit than ‘num’, the stored value will be shown.

- INT(3) ZEROFILL with the stored value of 150000 will show 150000
- INT(3) with the stored value of 150000 will show 150000
- INT with the stored value of 150000 will show 150000

The similar applies to BIGINT, MEDIUMINT, SMALLINT, and TINYINT as well.

The number in brackets will tell MySQL how many zeros to pad incoming integers with. For example: If you’re using ZEROFILL on a column that is set to INT(5) and the number 78 is inserted, MySQL will pad that value with zeros until the number satisfies the number in brackets. i.e. 78 will become 00078 and 127 will become 00127. To sum it up: The number in brackets is used for display purposes.

In a way, the number in brackets is kind of useless unless you’re using the ZEROFILL attribute.

Here is an example of how this the display value affect the columns which are ZEROFILL.

```
CREATE TABLE `tbl_zerofill` (`` ```id` int(11) NOT NULL AUTO_INCREMENT,`` ```int1` int(10) NOT NULL,`` ```int2` int(3) NOT NULL,`` ```zerofill1` int(10) ZEROFILL NOT NULL,`` ```zerofill2` int(3) ZEROFILL NOT NULL,`` ``PRIMARY KEY (`id`)`` ``) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `tbl_zerofill` (`int1`, `int2`, `zerofill1`, `zerofill2`) VALUES (10000, 10000, 10000, 10000), (100, 100, 100, 100);
SELECT * FROM `tbl_zerofill`;
```

Output:

```
+----+-------+-------+------------+-----------+
| id | int1  | int2  | zerofill1  | zerofill2 |
+----+-------+-------+------------+-----------+
|  1 | 10000 | 10000 | 0000010000 |     10000 |
|  2 |   100 |   100 | 0000000100 |       100 |
+----+-------+-------+------------+-----------+
```