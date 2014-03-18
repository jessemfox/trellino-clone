
json.(@board, :title, :created_at, :updated_at)
json.lists(@lists	, :rank, :title, :id)
json.cards(@cards, :rank, :description, :title, :list_id)
json.members(@members, :id, :email)
