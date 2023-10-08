CREATE USER 'retool_readonly'@'%' IDENTIFIED BY 'change$me';
GRANT SELECT ON *.* TO 'retool_readonly'@'%';

