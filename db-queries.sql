CREATE TABLE `user_credentials` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) NOT NULL,
   `password` varchar(255) NOT NULL,
   `role` ENUM('ADMIN', 'SUPERADMIN', 'user') DEFAULT 'user',
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- user_credentials

CREATE TABLE `admin_credentials` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` varchar(255) NOT NULL,
   `client_secret` varchar(255) NOT NULL,
   `is_active` boolean NOT NULL DEFAULT 1,
   `currency` varchar(3) NOT NULL,
   `name` varchar(255) NOT NULL,
   `email` varchar(255) NOT NULL,
   `phone` varchar(20) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


