package com.projetosistemas.vendaingressos;

import com.projetosistemas.vendaingressos.entity.Role;
import com.projetosistemas.vendaingressos.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VendaingressosApplication {

	public static void main(String[] args) {
		SpringApplication.run(VendaingressosApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository){
		return args -> {
			roleRepository.save(new Role(1L, "Vendedor"));
			roleRepository.save(new Role(2L, "Comprador"));
		};
	}
}
