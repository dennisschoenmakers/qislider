require './version.rb'

def pkg_name
  "qislider-%s" % VERSION
end

def pkg_dir
  "pkg/#{pkg_name}"
end

task :build => [:mkdir,:copy_base,  :build_javascript, :build_sass, :package_assets] do
  `zip #{pkg_dir}/#{pkg_name}.zip #{pkg_dir}`
end



task :publish do
   `mkdir -p /tmp/#{pkg_dir} 2>/dev/null`
  `cp -Rf #{pkg_dir} /tmp/#{pkg_dir}`
  `git checkout gh-pages`
  `cp -Rf /tmp/#{pkg_dir} .`
  `git commit -a -m "Published version #{VERSION}"`
  `git push origin gh-pages`
  `git checkout master`
end




task :copy_base do
    `haml -r ./version.rb index.haml #{pkg_dir}/index.html`
end


task :mkdir do
    `mkdir #{pkg_dir} \
    mkdir #{pkg_dir}/ext \
    mkdir #{pkg_dir}/images 2>/dev/null`
end

task :build_javascript do 
  `sprocketize -I src \
              qislider.js > #{pkg_dir}/qislider.js`  
end

task :build_sass do 
  `sass stylesheets/slider.sass > #{pkg_dir}/qislider.css`
end

task :package_assets do
  `cp -Rf images/* #{pkg_dir}/images/`
  `cp -Rf ext/* #{pkg_dir}/ext/`
end
