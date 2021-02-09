drop database group_manager;
create database group_manager;
ALTER DATABASE group_manager charset=utf8;

use group_manager;

CREATE TABLE `sessions` (`id` varchar(100) NOT NULL, `session` longtext NOT NULL, PRIMARY KEY (`id`));