Must have #script = second_screen_db.sql
ant migrate-local (runs #script locally)
ant migrate-remote (uploads #script and runs it remotly)
ant migrate-both
ant reload (runs #script remotly, no upload)

Warning:
both folders db_migrate and to-upload are connected, if you consider reusing
this setting, copy them both.

14/02/2013

mysql --default-character-set=utf8 -u erest_sql second_screen < second_screen.sql
show session variables like '%collation_connection%'; 
show variables like "%character%";show variables like "%collation%"; 

drop database second_screen;
use second_screen;
CREATE DATABASE second_screen DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;