define [
  'cordModel'
], (Model) ->

  class TabContentModel extends Model
    @configure "TabContentModel", "firstname", "lastname"

    fullName: -> [@firstname, @lastname].join(' ')

  TabContentModel