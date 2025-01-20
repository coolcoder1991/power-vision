"""add battery status table

Revision ID: 0c59e5564ebc
Revises: 49bd95f4b5a7
Create Date: 2025-01-19 22:59:14.477224

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0c59e5564ebc"
down_revision: Union[str, None] = "49bd95f4b5a7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "batteryStatus",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("device_id", sa.Integer(), nullable=True),
        sa.Column("battery_levl", sa.Float(), nullable=True),
        sa.Column("number_charges", sa.Integer(), nullable=True),
        sa.Column(
            "dt_updated", sa.DateTime(), server_default=sa.text("now()"), nullable=True
        ),
        sa.ForeignKeyConstraint(
            ["device_id"],
            ["device.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("batteryStatus")
    # ### end Alembic commands ###
