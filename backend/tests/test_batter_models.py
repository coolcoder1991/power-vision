#!/usr/bin/env python
# _*_ coding: utf-8 _*_

"""Tests for 'batter_models' package."""

import pytest
from click.testing import CliRunner

from batter_models import main


@pytest.fixture
def response():
    """Pytest fixture."""
    pass


def test_content(response):
    """Test content."""
    assert True


def test_command_line_interface():
    """Test the cli."""
    runner = CliRunner()
    help_result = runner.invoke(main.main, ["--help"])
    assert help_result.exit_code == 0
    assert "--help Show this message and exit." in help_result.output
