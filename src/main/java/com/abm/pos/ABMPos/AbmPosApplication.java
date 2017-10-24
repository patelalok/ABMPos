package com.abm.pos.ABMPos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.print.*;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.HashPrintServiceAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.PrintServiceAttributeSet;


@SpringBootApplication
public class AbmPosApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(AbmPosApplication.class, args);
	}

}
