# _*_ coding: utf-8 _*_

"""Console script for powervision_models."""
import sys

import click


@click.command()
def main(args=None):
    """Console script for powervision_models."""
    click.echo("Hello, what would you like to search for?")
    return 0


if __name__ == "__main__":
    sys.exit(main())  # pragma: no cover
