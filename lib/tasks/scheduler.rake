desc "This task is called by the Heroku scheduler add-on"
task :delete_preview_sheets => :environment do
  puts "Deleting sheets..."
  Spreadsheet.delete_preview_sheets
  puts "done."
end
