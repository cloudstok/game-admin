create database admin_game;
use admin_game;

CREATE TABLE `user_credentials` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) NOT NULL,
   `password` varchar(255) NOT NULL,
   `role` ENUM('ADMIN', 'SUPERADMIN') DEFAULT 'ADMIN' ,
   `is_deleted` tinyint(1) NOT NULL DEFAULT '1',
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- user_credentials

CREATE TABLE `admin_profile` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) NOT NULL,
   `client_secret` varchar(255) NOT NULL,
   `is_active` boolean NOT NULL DEFAULT 1,
   `currency` varchar(3) NOT NULL,
   `name` varchar(255) ,
   `email` varchar(255),
   `phone` varchar(20),
   `is_deleted` tinyint(1) NOT NULL DEFAULT '1',
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `user_profile` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) NOT NULL,
   `is_active` tinyint(1) NOT NULL DEFAULT '1',
   `name` varchar(255) NOT NULL,
   `email` varchar(255) DEFAULT NULL,
   `phone` varchar(20) DEFAULT NULL,
   `is_deleted` tinyint(1) NOT NULL DEFAULT '1',
   `created_by` varchar(255) NOT NULL,
   `is_verify` tinyint(1) DEFAULT '0',
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `wallet` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) DEFAULT NULL,
   `amount` varchar(20) DEFAULT NULL,
   `is_active` tinyint(1) NOT NULL DEFAULT '1',
   `is_deleted` tinyint(1) NOT NULL DEFAULT '1',
   `created_by` varchar(255) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
