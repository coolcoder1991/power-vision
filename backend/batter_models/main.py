# _*_ coding: utf-8 _*_

"""Console script for batter_models."""
import sys

import click

from batter_models.batter_models import func1


@click.command()
def main(args=None):
    """Console script for batter_models."""
    click.echo("Hello, what would you like to search for?")
    return 0


if __name__ == "__main__":
    sys.exit(main())  # pragma: no cover
