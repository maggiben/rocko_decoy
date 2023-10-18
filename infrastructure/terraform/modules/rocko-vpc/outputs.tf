output "subnet-infrastructure-private-1-id" {
  value = aws_subnet.infrastructure-private-1.id
}
output "subnet-infrastructure-private-2-id" {
  value = aws_subnet.infrastructure-private-2.id
}
output "subnet-infrastructure-public-1-id" {
  value = aws_subnet.infrastructure-public-1.id
}
output "subnet-infrastructure-public-2-id" {
  value = aws_subnet.infrastructure-public-2.id
}
output "infrastructure-vpc-id" {
  value = aws_vpc.infrastructure-vpc.id
}
output "infrastructure-route-table-id" {
  value = aws_default_route_table.infrastructure-vpc.id
}
output "infrastructure-route-table-private-id" {
  value = aws_route_table.infrastructure_private.id
}
output "infrastructure-vpc-cidr" {
  value = aws_vpc.infrastructure-vpc.cidr_block
}
output "default_security_group_id" {
  value = aws_default_security_group.infrastructure-vpc.id
}
