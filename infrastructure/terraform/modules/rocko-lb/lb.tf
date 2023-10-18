resource "aws_security_group" "rocko_lb" {
  name        = "${var.environment}-rocko_${var.hostname}-security-group"
  description = "Rocko ${var.hostname} LB SG"
  vpc_id      = var.vpc_id

  tags = {
    Name      = "rocko_${var.hostname}"
    ManagedBy = "terraform"
  }
}

resource "aws_security_group_rule" "rocko_lb_public_out" {
  type        = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.rocko_lb.id
}

resource "aws_security_group_rule" "rocko_lb_https" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.rocko_lb.id
}

resource "aws_security_group_rule" "rocko_lb_http" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.rocko_lb.id
}

resource "aws_lb" "rocko_lb" {
  name                       = "${var.environment}-rocko-${var.hostname}-lb"
  subnets                    = [var.subnet1_id, var.subnet2_id]
  security_groups            = [aws_security_group.rocko_lb.id]
  drop_invalid_header_fields = true
  idle_timeout               = var.idle_timeout

  tags = {
    Name      = "rocko"
    ManagedBy = "terraform"
  }
}

resource "aws_lb_target_group" "rocko_target_group" {
  name                 = "${var.environment}-rocko-${var.hostname}-target-group"
  port                 = 5000
  protocol             = "HTTP"
  vpc_id               = var.vpc_id
  target_type          = "ip"
  deregistration_delay = 10

  health_check {
    path                = var.healthcheck_uri
    port                = "traffic-port"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 10
    timeout             = 3
    matcher             = "200-308"
  }

  tags = {
    Name      = "rocko"
    ManagedBy = "terraform"
  }
}

resource "aws_lb_listener" "rocko_listener_https" {
  load_balancer_arn = aws_lb.rocko_lb.id
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = var.cert_arn

  default_action {
    target_group_arn = aws_lb_target_group.rocko_target_group.id
    type             = "forward"
  }
}

resource "aws_lb_listener" "rocko_listener_http" {
  load_balancer_arn = aws_lb.rocko_lb.id
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
