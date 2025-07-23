package net.riduan.ems.service.impl;

import lombok.AllArgsConstructor;
import net.riduan.ems.dto.EmployeeDto;
import net.riduan.ems.entity.Employee;
import net.riduan.ems.mapper.EmployeeMapper;
import net.riduan.ems.repository.EmployeeRepository;
import net.riduan.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
}
