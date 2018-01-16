package com.abm.pos.ABMPos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.print.*;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.HashPrintServiceAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.PrintServiceAttributeSet;


@SpringBootApplication
@EnableCaching
@EnableScheduling
public class AbmPosApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(AbmPosApplication.class, args);
	}

}
