#include "menu.h"
#include "ui_menu.h"
#include <QPushButton>
#include "information.h"

menu::menu(QString s, QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::menu)
{
    ui->setupUi(this);
    QObject::connect(ui->pushButton, SIGNAL(clicked()),this, SLOT(clickedSlot()));
    ui->label->setText(ui->label->text().append(s));
}

menu::~menu()
{
    delete ui;
}

void menu::clickedSlot() {
    Information* i = new Information();
    this->close();
    i->show();
}
