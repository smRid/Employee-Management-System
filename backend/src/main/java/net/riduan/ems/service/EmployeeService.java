package net.riduan.ems.service;

import net.riduan.ems.dto.EmployeeDto;


public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);
}


