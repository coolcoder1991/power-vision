"""add data

Revision ID: 1a4f9e7c8707
Revises: dbe7a7d69816
Create Date: 2025-01-20 19:28:20.165138

"""
from typing import Sequence, Union

from sqlalchemy import MetaData, Table

from alembic import op
from powervision_models.powervision_models import Accounts, Base

# revision identifiers, used by Alembic.
revision: str = "1a4f9e7c8707"
down_revision: Union[str, None] = "dbe7a7d69816"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # get metadata from current connection

    # define table representation
    op.execute("INSERT into accounts(name, password) VALUES('admin', 'admin')")


def downgrade() -> None:
    op.execute('drop * from accounts where name="admin" and id=1')
